import { Injectable } from '@nestjs/common';
import { allBoardDto, boardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  async getAll(): Promise<allBoardDto[]> {
    return [
      {
        id: 1,
        title: 'title',
        photo: 'photo',
        reservationStart: new Date(),
        reservationEnd: new Date(),
        credit: 100,
        likes: 1,
        category: 'category',
        area: 'area',
      },
    ];
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
}
