import { Module } from '@nestjs/common';
import { DiaryDraftService } from './diary-draft.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [DiaryDraftService, PrismaService],
  exports: [DiaryDraftService, PrismaService],
})
export class DiaryDraftModule {}
