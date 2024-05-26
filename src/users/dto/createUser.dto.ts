import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { CreateReceiverDto } from 'src/receiver/dto/createReceiver.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @Type(() => CreateReceiverDto)
  readonly receiverList: CreateReceiverDto[];
}
