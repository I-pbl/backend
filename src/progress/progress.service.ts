import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Progress, ProgressStatement } from './entities/progress.entity';
import { CreateProgressDto } from './dto/createProgress.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProgressService {
  private readonly logger = new Logger(ProgressService.name);
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
  ) {}

  async createProgress(createProgressDto: CreateProgressDto) {
    const newProgress = this.progressRepository.create({
      statement: ProgressStatement.READY,
      post: {
        id: createProgressDto.postId,
      },
      request: {
        id: createProgressDto.requestId,
      },
      startTime: null,
      onGoingTime: null,
      completeTime: null,
      cost: null,
    });
    try {
      return await this.progressRepository.save(newProgress);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProgressById(progressId: number) {
    return this.progressRepository.findOne({
      where: {
        id: progressId,
      },
      relations: [
        'post.receiver',
        'request.helper',
        'post.customer.receiverList',
      ],
    });
  }

  async setProgressState(progressId: number, statement: ProgressStatement) {
    const progress = await this.progressRepository.findOne({
      where: {
        id: progressId,
      },
    });
    if (!progress) {
      throw new HttpException('Progress not found', HttpStatus.NOT_FOUND);
    }

    progress.statement = statement;
    if (statement === 'start') {
      progress.startTime = new Date();
    } else if (statement === 'on-going') {
      progress.onGoingTime = new Date();
    } else {
      progress.completeTime = new Date();
    }

    try {
      return await this.progressRepository.save(progress);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async setProgressCost(progressId: number, cost: number) {
    const progress = await this.progressRepository.findOne({
      where: {
        id: progressId,
      },
    });
    if (!progress) {
      throw new HttpException('Progress not found', HttpStatus.NOT_FOUND);
    }

    progress.cost = cost;

    try {
      return await this.progressRepository.save(progress);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
