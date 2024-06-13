import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/auth.guard';
import { Payload } from 'src/auth/dto/jwt-payload.dto';
import { GetUser } from 'src/users/decorators/GetUser.decorator';
import { HelperService } from './helper.service';

@Controller('helper')
@UseGuards(JwtGuard)
export class HelperController {
  constructor(private readonly helperService: HelperService) {}

  @Post('/image/:helperId')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @GetUser() user: Payload,
    @UploadedFile() file: Express.Multer.File,
    @Param('helperId') helperId: number,
  ) {
    return this.helperService.uploadImage(helperId, file);
  }
}
