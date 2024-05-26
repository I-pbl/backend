import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateReceiverDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly owner: boolean;
}
