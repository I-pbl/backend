import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { CreateProgressDto } from './dto/createProgress.dto';
import { ProgressStatement } from './entities/progress.entity';
import { SetProgressStateDto } from './dto/setProgressState';

@Controller('progress')
@UseGuards(JwtGuard)
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Post('/')
  async createProgress(@Body() body: CreateProgressDto) {
    return await this.progressService.createProgress(body);
  }

  @Get('/:progressId')
  async getProgressById(@Param('progressId') progressId: number) {
    return await this.progressService.getProgressById(progressId);
  }

  @Post('/state/:progressId')
  async setProgressState(
    @Param('progressId') progressId: number,
    @Body() body: SetProgressStateDto,
  ) {
    return await this.progressService.setProgressState(progressId, body.state);
  }

  @Post('/cost/:progressId')
  async setProgressCost(
    @Param('progressId') progressId: number,
    @Body() body: { cost: number },
  ) {
    return await this.progressService.setProgressCost(progressId, body.cost);
  }
}
