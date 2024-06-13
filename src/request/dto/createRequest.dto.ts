import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestDto {
  @IsNotEmpty()
  @IsNumber()
  readonly minCost: number;

  @IsNotEmpty()
  @IsNumber()
  readonly maxCost: number;

  @IsNotEmpty()
  @IsString()
  readonly offerLetter: string;

  @IsNotEmpty()
  @IsNumber()
  readonly postId: number;
}
