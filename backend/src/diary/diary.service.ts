import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DiaryDraftService } from 'src/diary-draft/diary-draft.service';
import { PrismaService } from 'src/prisma.service';
import { SaveDraftDto } from './dto/saveDraft.dto';
import { DiaryStatus } from '@prisma/client';

@Injectable()
export class DiaryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly diaryDraftService: DiaryDraftService,
  ) {}

  async create(userId: number) {
    try {
      const newDiary = await this.prismaService.diary.create({
        data: {
          userId,
        },
      });
      await this.diaryDraftService.createForEachDiary(newDiary.id);

      return this.getCurrentDiaryDraft(userId, newDiary.id);
    } catch (e) {
      throw new InternalServerErrorException('日記の作成に失敗しました');
    }
  }

  async saveDraft(userId: number, diaryId: number, saveDraftDto: SaveDraftDto) {
    try {
      await this.diaryDraftService.createDraft(diaryId, saveDraftDto);
      await this.prismaService.diary.update({
        data: {
          status: DiaryStatus.DRAFT,
        },
        where: {
          id: diaryId,
        },
      });

      return this.getCurrentDiaryDraft(userId, diaryId);
    } catch (e) {
      throw new InternalServerErrorException('下書きの保存に失敗しました');
    }
  }

  async save(userId: number, diaryId: number, saveDraftDto: SaveDraftDto) {
    try {
      await this.diaryDraftService.deleteByDiaryId(diaryId);
      await this.diaryDraftService.createDraft(diaryId, saveDraftDto);
      await this.prismaService.diary.update({
        data: {
          status: DiaryStatus.PUBLISHED,
        },
        where: {
          id: diaryId,
        },
      });

      return this.getCurrentDiaryDraft(userId, diaryId);
    } catch (e) {
      throw new InternalServerErrorException('保存に失敗しました');
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
