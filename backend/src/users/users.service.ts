import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { exclude } from 'src/utils/excludeField';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUniqueByWhenUnAuthorized(email: string) {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async findId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return exclude<User, 'password'>(user, ['password']);
  }
}
