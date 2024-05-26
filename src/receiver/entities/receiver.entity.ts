import { Exclude } from 'class-transformer';
import { Customer } from 'src/customer/entities/customer.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Receiver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  address: string;

  @Column({ type: 'boolean' })
  owner: boolean;

  @Column({
    nullable: true,
  })
  photo: string | null;

  @ManyToOne(() => Customer, (customer) => customer.receiverList)
  customer: Customer;

  @OneToMany(() => Post, (post) => post.receiver)
  postList: Post[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
