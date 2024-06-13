import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from './entities/progress.entity';
import { ProgressController } from './progress.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  providers: [ProgressService, JwtStrategy],
  controllers: [ProgressController],
})
export class ProgressModule {}
