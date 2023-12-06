import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DiaryDraftService {
  constructor(private readonly prismaService: PrismaService) {}

  async createForEachDiary(diaryId: number) {
    const diaryDraft = await this.prismaService.diaryDraft.create({
      data: {
        diaryId,
        title: '無題の日記',
        content: '',
      },
    });

    return diaryDraft;
  }

  async getLatest(userId: number, diaryId: number) {
    const latest = await this.prismaService.diaryDraft.findFirst({
      where: {
        diaryId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return latest;
  }
}
