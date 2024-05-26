import { Module, forwardRef } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ReceiverModule } from 'src/receiver/receiver.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    forwardRef(() => ReceiverModule),
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
