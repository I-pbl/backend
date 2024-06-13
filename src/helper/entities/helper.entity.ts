import { Exclude } from 'class-transformer';
import { Request } from 'src/request/entities/request.entity';
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
export class Helper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  location: string;

  @Column()
  specialties: string;

  @Column()
  certificate: string;

  @Column()
  score: number;

  @Column({ nullable: true })
  photo: string | null;

  @OneToMany(() => Request, (request) => request.helper, { nullable: true })
  requestList: Request[];

  @OneToOne(() => User, (user) => user.helper)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
