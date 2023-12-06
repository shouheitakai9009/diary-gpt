import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DiaryDraftService } from 'src/diary-draft/diary-draft.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DiaryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly diaryDraftService: DiaryDraftService,
  ) {}

  async create(userId: number) {
    try {
      const diary = await this.prismaService.diary.create({
        data: {
          userId,
        },
      });
      const diaryDraft = await this.diaryDraftService.createForEachDiary(
        diary.id,
      );

      return diaryDraft;
    } catch (e) {
      throw new InternalServerErrorException('日記の作成に失敗しました');
    }
  }

  async getCurrentDiaryDraft(userId: number, diaryId: number) {
    return this.prismaService.diary.findUnique({
      where: {
        id: diaryId,
        userId,
      },
      include: {
        drafts: {
          orderBy: {
            updatedAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  async getListWithDiaryDrafts(userId: number) {
    return this.prismaService.diary.findMany({
      where: {
        userId,
      },
      include: {
        drafts: {
          orderBy: {
            updatedAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
