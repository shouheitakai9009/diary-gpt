import { Module } from '@nestjs/common';
import { DiaryService } from './diary.service';
import { PrismaService } from 'src/prisma.service';
import { DiaryDraftModule } from 'src/diary-draft/diary-draft.module';

@Module({
  imports: [DiaryDraftModule],
  providers: [DiaryService, PrismaService],
  exports: [DiaryService, PrismaService],
})
export class DiaryModule {}
