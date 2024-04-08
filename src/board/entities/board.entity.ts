import {
  Column,
  CreateDateColumn,
  Entity,
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

  @Column()
  photo: string;

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
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Column()
  userId: number;
}
