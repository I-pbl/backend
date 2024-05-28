import { Controller, Get, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/decorators/GetUser.decorator';
import { Payload } from 'src/auth/dto/jwt-payload.dto';

@Controller('post')
@UseGuards(JwtGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('all')
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }
}
