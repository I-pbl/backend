import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReceiverDto } from './dto/createReceiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ReceiverService {
  constructor(
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
    private readonly s3Service: S3Service,
  ) {}

  async createReceiver(
    receiver: CreateReceiverDto,
    customer: Customer,
  ): Promise<Receiver> {
    const newReceiver = this.receiverRepository.create({
      name: receiver.name,
      phoneNumber: receiver.phoneNumber,
      address: receiver.address,
      owner: receiver.owner,
      customer: customer,
    });
    try {
      return await this.receiverRepository.save(newReceiver);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getReceiver(receiverId: number): Promise<Receiver> {
    return this.receiverRepository.findOne({
      where: {
        id: receiverId,
      },
    });
  }

  async updateReceiver(receiver: Receiver): Promise<Receiver> {
    return this.receiverRepository.save(receiver);
  }

  async uploadImage(receiverId: number, file: Express.Multer.File) {
    const folderKey = `receiver/${receiverId}`;
    const ext = file.originalname.split('.').pop();
    const fileName = 'profile';
    const url = await this.s3Service.uploadFile(
      folderKey,
      fileName,
      ext,
      file.buffer,
    );

    const receiver = await this.receiverRepository.findOne({
      where: {
        id: receiverId,
      },
    });
    receiver.photo = url;
    try {
      await this.receiverRepository.save(receiver);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return url;
  }
}
