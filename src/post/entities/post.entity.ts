import { Exclude } from 'class-transformer';
import { Customer } from 'src/customer/entities/customer.entity';
import { Progress } from 'src/progress/entities/progress.entity';
import { Receiver } from 'src/receiver/entities/receiver.entity';
import { Request } from 'src/request/entities/request.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', {
    nullable: true,
    array: true,
  })
  photos: string[] | null;

  @Column({ type: 'timestamptz' })
  time: Date;

  @Column()
  content: string;

  @Column()
  address: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.postList)
  customer: Customer;

  @ManyToOne(() => Receiver, (receiver) => receiver.postList)
  receiver: Receiver;

  @OneToMany(() => Request, (request) => request.post)
  requestList: Request[];

  @OneToOne(() => Progress, (progress) => progress.post)
  progress: Progress;
}
