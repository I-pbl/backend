import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  IsNull,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('board')
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    nullable: true,
  })
  photo: string | null;

  @Column({ type: 'timestamptz' })
  reservationStart: Date;

  @Column({ type: 'timestamptz' })
  reservationEnd: Date;

  @Column()
  credit: number;

  @Column()
  content: string;

  @Column()
  likes: number;

  @Column()
  category: string;

  @Column()
  area: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  createdAt: Date;
}
