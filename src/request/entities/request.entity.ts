import { Helper } from 'src/helper/entities/helper.entity';
import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  minCost: number;

  @Column()
  maxCost: number;

  @Column()
  offerLetter: string;

  @ManyToOne(() => Post, (post) => post.request)
  post: Post;
  @ManyToOne(() => Helper, (helper) => helper.request)
  helper: Helper;
}
