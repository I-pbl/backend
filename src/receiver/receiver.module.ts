import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([Receiver]), S3Module],
  controllers: [ReceiverController],
  providers: [ReceiverService, JwtStrategy],
  exports: [ReceiverService],
})
export class ReceiverModule {}
