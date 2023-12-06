import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { CorsMiddleware } from './cors.middleware';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UploadController } from './upload/upload.controller';
import { ConfigModule } from '@nestjs/config';
import { DiaryController } from './diary/diary.controller';
import { DiaryService } from './diary/diary.service';
import { DiaryModule } from './diary/diary.module';
import { DiaryDraftModule } from './diary-draft/diary-draft.module';
import { DiaryDraftService } from './diary-draft/diary-draft.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule,
    DiaryModule,
    DiaryDraftModule,
  ],
  controllers: [AppController, UploadController, DiaryController],
  providers: [PrismaService, DiaryService, DiaryDraftService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
