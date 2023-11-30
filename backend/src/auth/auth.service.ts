import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin.dto';
import { SignupForEmailDto } from './dto/signupForEmail.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    dto: SigninDto,
  ): Promise<{ accessToken: string; userId: number }> {
    const user = await this.usersService.findUniqueByWhenUnAuthorized(
      dto.email,
    );
    if (user?.password !== dto.password) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが違います',
      );
    }
    const payload = { sub: user.id, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, userId: user.id };
  }

  async signUpForEmail(dto: SignupForEmailDto) {
    const user = await this.usersService.findUniqueByWhenUnAuthorized(
      dto.email,
    );
    if (user) {
      throw new BadRequestException('このメールアドレスは既に登録されています');
    }
    const newUser = await this.usersService.registrationProvisional(dto);
    if (!newUser) {
      throw new InternalServerErrorException('ユーザーの作成に失敗しました');
    }
    return newUser;
  }

  async getUser(userId: number) {
    return await this.usersService.findId(userId);
  }
}
