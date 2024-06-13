import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RequestService } from './request.service';
import { JwtGuard } from 'src/auth/auth.guard';

@Controller('request')
@UseGuards(JwtGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Get('/:id')
  async getRequestById(@Param('id') id: number) {
    return this.requestService.getRequestById(id);
  }
}
