import { AgeGroup, Level } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsHalfAlhanumeric } from 'src/decorators/is_alphanumeric';

export class SignupForEmailDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  @IsHalfAlhanumeric()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  readonly ageGroup: AgeGroup;

  @IsNotEmpty()
  readonly level: Level;
}
