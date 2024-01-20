import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FirstFeedbackDto } from './dto/firstFeedback.dto';
import { PrismaService } from 'src/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class ChatService {
  constructor(private prismaService: PrismaService) {}

  async firstFeedback(
    userId: string,
    diaryId: number,
    firstFeedbackDto: FirstFeedbackDto,
  ) {
    const feedbacks = await this.prismaService.diaryFeedback.findMany({
      where: {
        diaryId,
      },
    });
    if (feedbacks.length > 0) {
      throw new InternalServerErrorException(
        '初めてのフィードバックのみ登録できます',
      );
    }
    console.log(firstFeedbackDto);

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
              回答は日本語で、JSON（positive/negative/suggestions）形式で返却してください。

          [タイトル]
          ${firstFeedbackDto.title}
          [本文]
          ${firstFeedbackDto.content}
          `,
            },
          ],
        },
      ],
    };

    const result = await model.generateContent(prompt);
    console.log(result.response.promptFeedback, result.response.text());
  }
}
