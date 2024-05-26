import { Exclude } from 'class-transformer';
import { Post } from 'src/post/entities/post.entity';
import { Receiver } from 'src/receiver/entities/receiver.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @Column()
  creditCardInfo: string;

  @OneToMany(() => Post, (post) => post.customer, { nullable: true })
  postList: Post[];

  @OneToMany(() => Receiver, (receiver) => receiver.customer, {
    nullable: true,
  })
  receiverList: Receiver[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
