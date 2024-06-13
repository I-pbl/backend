import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { HelperService } from 'src/helper/helper.service';
import { Customer } from 'src/customer/entities/customer.entity';
import { Helper } from 'src/helper/entities/helper.entity';
import { CreateUserDto } from './dto/createUser.dto';
import { CreateReceiverDto } from 'src/receiver/dto/createReceiver.dto';
import { PostRequisitionDto } from './dto/postRequisition.dto';
import { PostService } from 'src/post/post.service';
import { ReceiverService } from 'src/receiver/receiver.service';
import { Post } from 'src/post/entities/post.entity';
import { CreateHelperDto } from 'src/helper/dto/createHelper.dto';
import { RequestService } from 'src/request/request.service';
import { CreateRequestDto } from 'src/request/dto/createRequest.dto';
import * as AWS from 'aws-sdk';
import path from 'path';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    @Inject(forwardRef(() => HelperService))
    private readonly helperService: HelperService,
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
    @Inject(forwardRef(() => ReceiverService))
    private readonly receiverService: ReceiverService,
    @Inject(forwardRef(() => RequestService))
    private readonly requestService: RequestService,
  ) {}

  async createUser(email: string): Promise<User> {
    const newUser = this.userRepository.create({
      email,
    });
    try {
      const user = this.userRepository.save(newUser);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['customer', 'helper'],
    });
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async getUser(userId: number): Promise<Customer> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['customer', 'customer.receiverList', 'customer.postList'],
    });
    if (!user.customer) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return user.customer;
  }

  async getHelper(userId: number): Promise<Helper> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['helper'],
    });
    const helper = user.helper;
    if (!helper) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return helper;
  }

  async registerHelper(userId: number, body: CreateHelperDto): Promise<Helper> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    const helper = await this.helperService.createHelper(body);
    try {
      user.helper = helper;
      await this.userRepository.save(user);
      return helper;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createRequisition(
    userId: number,
    body: PostRequisitionDto,
  ): Promise<Post> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['customer'],
    });
    const customer = user.customer;
    const receiver = await this.receiverService.getReceiver(body.receiverId);
    return await this.postService.createPost(customer, receiver, {
      time: body.time,
      address: body.address,
      title: body.title,
      content: body.content,
    });
  }

  async createRequest(userId: number, body: CreateRequestDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['helper'],
    });
    const helper = user.helper;
    return await this.requestService.createRequest(helper.id, body);
  }

  async getAllRequisitions(userId: number): Promise<Post[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['customer'],
    });
    const customer = user.customer;
    const postList = await this.postService.getAllPostsByCustomerId(
      customer.id,
    );
    return postList.filter(
      (post) => !post.progress || post.progress.statement !== 'done',
    );
  }

  async createReceiver(userId: number, body: CreateReceiverDto) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['customer'],
    });
    const customer = user.customer;
    return await this.receiverService.createReceiver(body, customer);
  }

  async getAllRequests(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: [
        'helper.requestList.progress',
        'helper.requestList.post.customer',
      ],
    });
    const requestList = user.helper.requestList;
    return requestList.filter(
      (request) =>
        request.progress.statement !== 'complete' && !request.progress.cost,
    );
  }
}
