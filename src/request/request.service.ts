import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dto/createRequest.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
  ) {}

  async createRequest(helperId: number, body: CreateRequestDto) {
    const newRequest = await this.requestRepository.create({
      minCost: body.minCost,
      maxCost: body.maxCost,
      offerLetter: body.offerLetter,
      post: {
        id: body.postId,
      },
      helper: {
        id: helperId,
      },
    });
    try {
      return await this.requestRepository.save(newRequest);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRequestById(id: number) {
    return await this.requestRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'post',
        'post.customer.receiverList',
        'post.receiver',
        'helper',
        'progress',
      ],
    });
  }
}
