import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Helper } from './entities/helper.entity';
import { Repository } from 'typeorm';
import { CreateHelperDto } from './dto/createHelper.dto';

@Injectable()
export class HelperService {
  private readonly logger = new Logger(HelperService.name);
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
  ) {}

  async createHelper(body: CreateHelperDto): Promise<Helper> {
    const newHelper = this.helperRepository.create({
      name: body.name,
      phoneNumber: body.phoneNumber,
      location: body.location,
      specialties: body.specialties,
      certificate: body.certificate,
      score: 0,
    });
    try {
      return await this.helperRepository.save(newHelper);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHelper(helperId: number) {
    return this.helperRepository.findOne({
      where: {
        id: helperId,
      },
      relations: ['request'],
    });
  }
}
