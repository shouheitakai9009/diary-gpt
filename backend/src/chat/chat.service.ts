import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FeedbackDto } from './dto/feedback.dto';
import { PrismaService } from 'src/prisma.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  FirstFeedbackResponse,
  firstFeedbackKeys,
} from 'src/types/firstFeedback';
import { feedbackPrompt } from 'src/utils/prompts/feedback';
import axios from 'axios';

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
              text: feedbackPrompt(feedbackDto),
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 1,
      },
    };

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    const response = JSON.parse(
      result.response
        .text()
        .replaceAll('```json', '')
        .replaceAll('```JSON', '')
        .replaceAll('`', ''),
    ) as FirstFeedbackResponse;

    const hasMatchKeys = Object.keys(response).every(
      (key: keyof FirstFeedbackResponse) => firstFeedbackKeys.includes(key),
    );

    if (!hasMatchKeys)
      throw new InternalServerErrorException(
        'レスポンスのキー情報に不正なフィードバックが検出されました',
      );

    const data = Object.keys(response).map((key) => {
      let value = data[key];
      if (Array.isArray(value)) value = value.join('\n\n');

      return {
        diaryId,
        isMe: false,
        content: `[${key}]\n${value}`,
      };
    });
    return await this.prismaService.diaryFeedback.createMany({
      data,
    });
  }
}
