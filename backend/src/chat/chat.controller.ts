import {
  Controller,
  UseGuards,
  Request,
  Param,
  Body,
  Get,
  Post,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';
import { FeedbackDto } from './dto/feedback.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Post('feedback/:diaryId')
  async feedback(
    @Request() req,
    @Param('diaryId') diaryId: string,
    @Body() feedbackDto: FeedbackDto,
  ) {
    return await this.chatService.feedback(Number(diaryId), feedbackDto);
  }

  @UseGuards(AuthGuard)
  @Get('all/:diaryId')
  async all(@Request() req, @Param('diaryId') diaryId: string) {
    return await this.chatService.all(Number(diaryId));
  }
}
