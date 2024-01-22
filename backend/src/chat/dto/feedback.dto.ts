import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class FeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
