import {
  Controller,
  Put,
  UseGuards,
  Request,
  Param,
  Body,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ChatService } from './chat.service';
import { FirstFeedbackDto } from './dto/firstFeedback.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(AuthGuard)
  @Put('first-feedback/:diaryId')
  async firstFeedback(
    @Request() req,
    @Param('diaryId') diaryId: string,
    @Body() firstFeedbackDto: FirstFeedbackDto,
  ) {
    return await this.chatService.firstFeedback(
      req.user.sub,
      Number(diaryId),
      firstFeedbackDto,
    );
  }
}
