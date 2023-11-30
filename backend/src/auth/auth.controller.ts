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
import { SignupForEmailDto } from './dto/signupForEmail.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: SigninDto) {
    const response = await this.authService.signIn(signInDto);
    return response;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUpForEmail(@Body() signUpDto: SignupForEmailDto) {
    const response = await this.authService.signUpForEmail(signUpDto);
    return response;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getUser(req.user.sub);
  }
}
