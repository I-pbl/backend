import { Post } from 'src/post/entities/post.entity';
import { Request } from 'src/request/entities/request.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ProgressStatement {
  READY = 'ready', //준비중
  START = 'start', //시작
  ONGOING = 'on-going', //진행중
  COMPLETE = 'complete', //완료
  DONE = 'done',
}

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ProgressStatement,
    default: ProgressStatement.READY, // default 값은 start
  })
  statement: ProgressStatement;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  startTime: Date | null;
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  onGoingTime: Date | null;
  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  completeTime: Date | null;

  @Column({
    nullable: true,
  }) // billing request에서 cost라고 해서 cost 사용
  cost: number | null;

  @OneToOne(() => Post, (post) => post.progress)
  @JoinColumn()
  post: Post;

  @OneToOne(() => Request, (request) => request.progress)
  @JoinColumn()
  request: Request;
}
