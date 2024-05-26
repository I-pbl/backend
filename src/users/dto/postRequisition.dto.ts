import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PostRequisitionDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsDateString()
  readonly time: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly receiverId: number;
}
