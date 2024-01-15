import {
  Controller,
  UseGuards,
  Request,
  Post,
  Get,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SaveDraftDto } from './dto/saveDraft.dto';

@Controller('diary')
export class DiaryController {
  constructor(private diaryService: DiaryService) {}

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Request() req) {
    return await this.diaryService.create(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Put('save-draft/:diaryId')
  async saveDraft(
    @Request() req,
    @Param('diaryId') diaryId: string,
    @Body() saveDraftDto: SaveDraftDto,
  ) {
    return await this.diaryService.saveDraft(
      req.user.sub,
      Number(diaryId),
      saveDraftDto,
    );
  }

  @UseGuards(AuthGuard)
  @Put('save/:diaryId')
  async save(
    @Request() req,
    @Param('diaryId') diaryId: string,
    @Body() saveDraftDto: SaveDraftDto,
  ) {
    return await this.diaryService.save(
      req.user.sub,
      Number(diaryId),
      saveDraftDto,
    );
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
