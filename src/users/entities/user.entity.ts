import { Customer } from 'src/customer/entities/customer.entity';
import { Helper } from 'src/helper/entities/helper.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  customer: Customer;

  @OneToOne(() => Helper, (helper) => helper.user, { nullable: true })
  helper: Helper;
}
