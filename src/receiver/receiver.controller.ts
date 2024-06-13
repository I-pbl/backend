import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/auth.guard';
import { ReceiverService } from './receiver.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/users/decorators/GetUser.decorator';
import { Payload } from 'src/auth/dto/jwt-payload.dto';

@Controller('receiver')
@UseGuards(JwtGuard)
export class ReceiverController {
  private readonly logger = new Logger(ReceiverController.name);
  constructor(private readonly receiverService: ReceiverService) {}

  @Get('/:receiverId')
  async getReceiver(@Param('receiverId') receiverId: number) {
    return this.receiverService.getReceiver(receiverId);
  }

  @Post('/image/:receiverId')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('receiverId') receiverId: number,
  ) {
    return this.receiverService.uploadImage(receiverId, file);
  }
}
