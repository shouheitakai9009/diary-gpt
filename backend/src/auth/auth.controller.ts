import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/factory/public';
import { AuthGuard } from './auth.guard';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    const { accessToken } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return { accessToken };
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUpForEmail(@Body() signInDto: { email: string; password: string }) {
    const { accessToken } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getUser(req.user.sub);
  }
}
