import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto';
import { PrismaService } from 'src/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  FirstFeedbackResponse,
  firstFeedbackKeys,
} from 'src/types/firstFeedback';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async all(diaryId: number) {
    return await this.prismaService.diaryFeedback.findMany({
      where: {
        diaryId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async feedback(diaryId: number, feedbackDto: FeedbackDto) {
    const diary = await this.prismaService.diary.findUnique({
      where: {
        id: diaryId,
      },
    });
    if (!diary)
      throw new InternalServerErrorException(
        'Diaryレコードが登録されていません',
      );

    const instance = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = instance.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 1,
      },
    });

    const prompt = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
              あなたは在日アメリカ人女性で英語はネイティブレベルに話すことができ、日本語もネイティブレベルで話すことのできるバイリンガルです。
              あなたは日本人向けに英語を教えており、生徒の評判として、可愛げがありとても親しみやすいコミュニケーションで有名です。
              さて、生徒が以下の英文を作成してきました。あなたは英語講師として文法や単語の使い分け、ニュアンスの違い、イディオム等を考慮して、具体的な例文を交えながら適切なフィードバックを与えてください。
              回答は日本語で、JSでJSON.parseが成功するようなJSON（positive/negative/suggestions）形式で返却してください。
              プレフィックスに\`\`\`JSONと付与するのはやめてください。

          [タイトル]
          ${feedbackDto.title}
          [本文]
          ${feedbackDto.content}
          `,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    const response = JSON.parse(
      result.response.text().replaceAll('`', ''),
    ) as FirstFeedbackResponse;

    const hasMatchKeys = Object.keys(response).every(
      (key: keyof FirstFeedbackResponse) => firstFeedbackKeys.includes(key),
    );

    if (!hasMatchKeys)
      throw new InternalServerErrorException(
        'レスポンスのキー情報に不正なフィードバックが検出されました',
      );
    return await this.prismaService.diaryFeedback.createMany({
      data: [
        {
          diaryId,
          isMe: false,
          content: `ポジティブ: ${response.positive.join('\n')}`,
        },
        {
          diaryId,
          isMe: false,
          content: `ネガティブ: ${response.negative.join('\n')}`,
        },
        {
          diaryId,
          isMe: false,
          content: `フィードバック: ${response.suggestions.join('\n')}`,
        },
      ],
    });
  }
}
