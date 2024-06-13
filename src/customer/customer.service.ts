import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { CreateReceiverDto } from 'src/receiver/dto/createReceiver.dto';
import { ReceiverService } from 'src/receiver/receiver.service';

@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name);
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @Inject(forwardRef(() => ReceiverService))
    private readonly receiverService: ReceiverService,
  ) {}

  async createCustomer() {
    const newCustomer = this.customerRepository.create({
      creditCardInfo: '1234-5678-9012-3456',
    });
    try {
      const customer = this.customerRepository.save(newCustomer);
      return customer;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCustomer(customerId: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: {
        id: customerId,
      },
      relations: ['receiver', 'post'],
    });
  }

  async createReceiverList(
    customerId: number,
    receiverList: CreateReceiverDto[],
  ) {
    const customer = await this.customerRepository.findOne({
      where: {
        id: customerId,
      },
    });
    for (let receiver of receiverList) {
      await this.receiverService.createReceiver(receiver, customer);
    }
    return await this.customerRepository.save(customer);
  }

  async getReceiverList(customerId: number) {
    const customer = await this.customerRepository.findOne({
      where: {
        id: customerId,
      },
      relations: ['receiverList'],
    });

    return customer.receiverList;
  }
}
