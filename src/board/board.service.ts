import { Injectable } from '@nestjs/common';
import { allBoardDto, boardDto, createBoardDto } from './dto/board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardRepository: Repository<BoardEntity>,
  ) {}
  async getAll(): Promise<allBoardDto[]> {
    const allBoard = await this.boardRepository.find();
    return allBoard;
  }

  async getOne(id: number): Promise<boardDto> {
    return {
      id: id,
      title: 'title',
      photo: 'photo',
      reservationStart: new Date(),
      reservationEnd: new Date(),
      credit: 100,
      content:
        'My name is Julia, and my washing machine has broken down. This has made my daily life very inconvenient. Not being able to do laundry due to the washer not functioning is causing significant trouble. The issue is that the washing machine does not turn on when the power is switched on, and there is no sound coming from it. I need the assistance of a professional to address this problem. I hope the repair can be done as soon as possible. I would greatly appreciate it if you could contact me as soon as possible. Thank you to those who can help with my washing machine repair. My name is Julia, and my washing machine has broken down. This has made my daily life very inconvenient. Not being able to do laundry due to the washer not functioning is causing significant trouble. The issue is that the washing machine does not turn on when the power is switched on, and there is no sound coming from it. I need the assistance of a professional to address this problem. I hope the repair can be done as soon as possible. I would greatly appreciate it if you could contact me as soon as possible. Thank you to those who can help with my washing machine repair.',
      category: 'category',
      area: 'area',
    };
  }

  async createBoard(board: createBoardDto) {
    console.log(board);
    try {
      const newBoard = this.boardRepository.create({
        title: board.title,
        content: board.content,
        credit: board.credit,
        reservationStart: board.reservationStart,
        reservationEnd: board.reservationEnd,
        category: board.category,
        area: 'test',
        likes: 0,
      });
      this.boardRepository.save(newBoard);
      return newBoard;
    } catch (error) {
      console.log(error);
    }
  }
}
