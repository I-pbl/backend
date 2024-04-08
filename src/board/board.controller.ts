import { Controller, Get, Param } from '@nestjs/common';
import { allBoardDto, boardDto } from './dto/board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}
  @Get('/all')
  async getAll(): Promise<allBoardDto[]> {
    return this.boardService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id') id: number): Promise<boardDto> {
    return this.boardService.getOne(id);
  }
}
