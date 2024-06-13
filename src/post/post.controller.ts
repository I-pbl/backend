import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/users/decorators/GetUser.decorator';
import { Payload } from 'src/auth/dto/jwt-payload.dto';
import { GetPostDto } from './dto/getPost.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
@UseGuards(JwtGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('all')
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get('/:id')
  async getPostById(
    @GetUser() user: Payload,
    @Param('id') id: number,
  ): Promise<GetPostDto> {
    return await this.postService.getPostById(id);
  }

  @Post('/image/:postId')
  @UseInterceptors(FilesInterceptor('image'))
  async uploadImages(
    @GetUser() user: Payload,
    @Param('postId') postId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.postService.uploadImages(postId, files);
  }
}
