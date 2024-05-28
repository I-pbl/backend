import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHelperDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  readonly location: string;

  @IsNotEmpty()
  @IsString()
  readonly specialties: string;

  @IsNotEmpty()
  @IsString()
  readonly certificate: string;
}
