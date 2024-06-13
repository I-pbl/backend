import { Module, forwardRef } from '@nestjs/common';
import { HelperService } from './helper.service';
import { HelperController } from './helper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from './entities/helper.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Helper]), forwardRef(() => S3Module)],
  providers: [HelperService, JwtStrategy],
  controllers: [HelperController],
  exports: [HelperService],
})
export class HelperModule {}
