import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReceiverDto } from './dto/createReceiver.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class ReceiverService {
  constructor(
    @InjectRepository(Receiver)
    private readonly receiverRepository: Repository<Receiver>,
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
}
