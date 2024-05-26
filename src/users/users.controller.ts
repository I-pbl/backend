import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/auth.guard';
import { GetUser } from './decorators/GetUser.decorator';
import { Payload } from 'src/auth/dto/jwt-payload.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { PostRequisitionDto } from './dto/postRequisition.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  private validateUserMode(user: Payload, mode: 'user' | 'helper') {
    if (user.mode !== mode) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('/requisition')
  async createRequisition(
    @GetUser() user: Payload,
    @Body() body: PostRequisitionDto,
  ) {
    this.logger.log(body);
    this.validateUserMode(user, 'user');
    return await this.usersService.createRequisition(user.userId, body);
  }

  @Get('/user')
  async getUsers(@GetUser() user: Payload) {
    this.logger.log(user.userId);
    this.validateUserMode(user, 'user');
    return await this.usersService.getUser(user.userId);
  }

  @Post('/user/register')
  async registerUser(@GetUser() user: Payload, @Body() body: CreateUserDto) {
    this.validateUserMode(user, 'user');
    this.logger.log(body);
    return await this.usersService.registerUser(user.userId, body.receiverList);
  }

  @Get('/helper')
  async getHelpers(@GetUser() user: Payload) {
    this.validateUserMode(user, 'helper');
    return await this.usersService.getHelper(user.userId);
  }
}
