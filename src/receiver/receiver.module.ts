import { Module } from '@nestjs/common';
import { ReceiverController } from './receiver.controller';
import { ReceiverService } from './receiver.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receiver } from './entities/receiver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receiver])],
  controllers: [ReceiverController],
  providers: [ReceiverService],
})
export class ReceiverModule {}
