import { Controller, Get, Logger, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth.guard';
import { ReceiverService } from './receiver.service';

@Controller('receiver')
@UseGuards(JwtGuard)
export class ReceiverController {
  private readonly logger = new Logger(ReceiverController.name);
  constructor(private readonly receiverService: ReceiverService) {}

  @Get('/:receiverId')
  async getReceiver(@Param('receiverId') receiverId: number) {
    return this.receiverService.getReceiver(receiverId);
  }
}
