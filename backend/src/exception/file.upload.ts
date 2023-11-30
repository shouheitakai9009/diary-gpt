import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class FileUploadExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as {
      message: string;
      error: string;
      statusCode: number;
    };
    if (
      exceptionResponse.message.includes('expected size is less than 10000')
    ) {
      // カスタマイズされたエラーメッセージ
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message:
          'アップロードされたファイルが大きすぎます。10MB以下のファイルを選択してください。',
      });
    } else {
      // その他のHTTP例外の場合はデフォルトの処理を行う
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: exceptionResponse.message,
      });
    }
  }
}
