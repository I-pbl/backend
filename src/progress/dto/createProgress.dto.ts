import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProgressDto {
  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly requestId: number;
}
