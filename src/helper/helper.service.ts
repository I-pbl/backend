import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Helper } from './entities/helper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HelperService {
  private readonly logger = new Logger(HelperService.name);
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
  ) {}

  async createHelper(): Promise<Helper> {
    const newHelper = this.helperRepository.create({
      name: '',
      phone: '',
      location: '',
      specialties: '',
      certificate: '',
      score: 0,
    });
    try {
      const helper = this.helperRepository.save(newHelper);
      return helper;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
