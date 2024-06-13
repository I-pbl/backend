import { Module, forwardRef } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CustomerModule } from 'src/customer/customer.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    forwardRef(() => CustomerModule),
    S3Module,
  ],
  controllers: [PostController],
  providers: [PostService, JwtStrategy],
  exports: [PostService],
})
export class PostModule {}
