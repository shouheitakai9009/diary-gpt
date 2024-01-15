import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class SaveDraftDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
