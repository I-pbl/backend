import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { allBoardDto, boardDto, createBoardDto } from './dto/board.dto';
import { BoardService } from './board.service';
import { FilesInterceptor } from '@nestjs/platform-express';

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

  @Post()
  async createBoard(@Body() board: createBoardDto) {
    return this.boardService.createBoard(board);
  }

  @Post('/images')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadImages(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
