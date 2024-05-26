import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Receiver } from 'src/receiver/entities/receiver.entity';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(
    customer: Customer,
    receiver: Receiver,
    post: CreatePostDto,
  ) {
    const newPost = this.postRepository.create({
      time: post.time,
      address: post.address,
      title: post.title,
      content: post.content,
      customer,
      receiver,
    });
    try {
      const createdPost = await this.postRepository.save(newPost);
      return createdPost;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
