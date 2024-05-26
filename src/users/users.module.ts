import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { CustomerModule } from 'src/customer/customer.module';
import { HelperModule } from 'src/helper/helper.module';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PostModule } from 'src/post/post.module';
import { ReceiverModule } from 'src/receiver/receiver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CustomerModule),
    forwardRef(() => HelperModule),
    forwardRef(() => PostModule),
    forwardRef(() => ReceiverModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
