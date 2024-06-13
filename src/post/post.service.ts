import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Receiver } from 'src/receiver/entities/receiver.entity';
import { CreatePostDto } from './dto/createPost.dto';
import { GetPostDto } from './dto/getPost.dto';
import { CustomerService } from 'src/customer/customer.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly s3Service: S3Service,
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

  async getAllPosts() {
    const postList = await this.postRepository.find({
      where: {
        progress: null,
      },
      relations: ['progress'],
    });
    return postList.filter((post) => !post.progress);
  }

  async getPostById(postId: number): Promise<GetPostDto> {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
      relations: ['customer', 'receiver'],
    });
    const customer = (
      await this.customerService.getReceiverList(post.customer.id)
    ).filter((receiver) => receiver.owner)[0];
    return {
      id: post.id,
      time: post.time,
      address: post.address,
      title: post.title,
      content: post.content,
      customer,
      receiver: post.receiver,
    };
  }

  async getAllPostsByCustomerId(customerId: number) {
    const postList = await this.postRepository.find({
      where: {
        customer: {
          id: customerId,
        },
      },
      relations: ['requestList.helper', 'progress'],
    });

    return postList;
  }

  async uploadImages(postId: number, files: Express.Multer.File[]) {
    const post = await this.postRepository.findOne({
      where: {
        id: postId,
      },
    });
    post.photos = [];
    const folderKey = `post/${postId}`;
    for (let i = 0; i < files.length; i++) {
      const ext = files[i].originalname.split('.').pop();
      const fileName = `image-${i}`;
      const url = await this.s3Service.uploadFile(
        folderKey,
        fileName,
        ext,
        files[i].buffer,
      );
      post.photos.push(url);
    }
    try {
      await this.postRepository.save(post);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
