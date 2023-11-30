import { Injectable } from '@nestjs/common';
import { RegisterStatus, User } from '@prisma/client';
import { SignupForEmailDto } from 'src/auth/dto/signupForEmail.dto';
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

  async registrationProvisional(signUpDto: SignupForEmailDto) {
    const user = await this.prisma.user.create({
      data: {
        ...signUpDto,
        registerStatus: RegisterStatus.PROVISIONAL_REGISTERED,
      },
    });
    return exclude<User, 'password'>(user, ['password']);
  }

  async updateImage(userId: number, imageSrc: string) {
    const user = await this.prisma.user.update({
      data: { imageSrc },
      where: { id: userId },
    });
    return exclude<User, 'password'>(user, ['password']);
  }
}
