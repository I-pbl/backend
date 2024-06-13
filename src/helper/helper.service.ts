import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Helper } from './entities/helper.entity';
import { Repository } from 'typeorm';
import { CreateHelperDto } from './dto/createHelper.dto';
import { S3Service } from 'src/s3/s3.service';
import path from 'path';

@Injectable()
export class HelperService {
  private readonly logger = new Logger(HelperService.name);
  constructor(
    @InjectRepository(Helper)
    private readonly helperRepository: Repository<Helper>,
    @Inject(forwardRef(() => S3Service))
    private readonly s3Service: S3Service,
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

  async updateHelper(helper: Helper) {
    return this.helperRepository.save(helper);
  }

  async uploadImage(helperId: number, file: Express.Multer.File) {
    const helper = await this.helperRepository.findOne({
      where: {
        id: helperId,
      },
    });
    if (!helper) {
      throw new HttpException('Helper not found', HttpStatus.NOT_FOUND);
    }
    const folderKey = `helper/${helperId}`;
    const ext = file.originalname.split('.').pop();
    const url = await this.s3Service.uploadFile(
      folderKey,
      'profile',
      ext,
      file.buffer,
    );
    helper.photo = url;
    await this.helperRepository.save(helper);
    return url;
  }
}
