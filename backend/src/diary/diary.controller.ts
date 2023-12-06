import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Param,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Request() req) {
    return await this.diaryService.create(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async list(@Request() req) {
    return await this.diaryService.getListWithDiaryDrafts(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('get/:id')
  async get(@Request() req, @Param('id') id: string) {
    return await this.diaryService.getCurrentDiaryDraft(
      req.user.sub,
      Number(id),
    );
  }
}
