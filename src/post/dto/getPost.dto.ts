import { Receiver } from 'src/receiver/entities/receiver.entity';

export class GetPostDto {
  readonly id: number;
  readonly time: Date;
  readonly address: string;
  readonly title: string;
  readonly content: string;
  readonly customer: Receiver;
  readonly receiver: Receiver;
}
