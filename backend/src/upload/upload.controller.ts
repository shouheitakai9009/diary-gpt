import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import axios, { AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import { FileUploadExceptionFilter } from 'src/exception/file.upload';
import { UploadResponse } from 'src/types/cloudflare';
import { UsersService } from 'src/users/users.service';

@Controller('upload')
export class UploadController {
  constructor(private userService: UsersService) {}

  @Post('user-image/:userId')
  @UseInterceptors(FileInterceptor('file'))
  @UseFilters(new FileUploadExceptionFilter())
  async uploadUserImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^image\/(jpg|jpeg|png|gif|bmp|tiff|tif|webp|)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 10,
          message: (maxSize) =>
            `アップロードされたファイルが大きすぎます。${
              maxSize / (1024 * 1024)
            }MB以下のファイルを選択してください。`,
        })
        .build({
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
    )
    file: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    const cloudflareApiUrl = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;
    try {
      const formData = new FormData();
      formData.append('file', file.buffer, file.originalname);

      const response = await axios.post<any, AxiosResponse<UploadResponse>>(
        cloudflareApiUrl,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_API_TOKEN}`,
            ...formData.getHeaders(),
          },
        },
      );
      if (response.data.success) {
        const updatedUser = await this.userService.updateImage(
          parseInt(userId, 10),
          response.data.result.variants[0],
        );
        if (updatedUser) return updatedUser;
        throw new InternalServerErrorException('ユーザの更新に失敗しました');
      }
      throw new InternalServerErrorException(
        '画像のアップロードに失敗しました',
      );
    } catch (error) {
      console.error('アップロード失敗:', error);
      throw new InternalServerErrorException(
        '画像のアップロードに失敗しました',
      );
    }
  }
}
