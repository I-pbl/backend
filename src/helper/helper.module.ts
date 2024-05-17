import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { HelperController } from './helper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Helper } from './entities/helper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Helper])],
  providers: [HelperService],
  controllers: [HelperController],
  exports: [HelperService],
})
export class HelperModule {}
