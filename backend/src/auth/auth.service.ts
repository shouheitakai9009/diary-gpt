import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; userId: number }> {
    const user = await this.usersService.findUniqueByWhenUnAuthorized(email);
    if (user?.password !== password) {
      throw new UnauthorizedException(
        'メールアドレスまたはパスワードが違います',
      );
    }
    const payload = { sub: user.id, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, userId: user.id };
  }

  async getUser(userId: number) {
    return await this.usersService.findId(userId);
  }
}
