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
import { PostRequisitionDto } from './dto/postRequisition.dto';
import { CreateHelperDto } from 'src/helper/dto/createHelper.dto';
import { CreateRequestDto } from 'src/request/dto/createRequest.dto';
import { CreateReceiverDto } from 'src/receiver/dto/createReceiver.dto';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  private validateUserMode(user: Payload, mode: 'user' | 'helper') {
    this.logger.log(user);
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

  @Get('/user/requisition/all')
  async getAllRequisitions(@GetUser() user: Payload) {
    this.validateUserMode(user, 'user');
    this.logger.log(user.userId);
    return await this.usersService.getAllRequisitions(user.userId);
  }
  @Get('/user')
  async getUsers(@GetUser() user: Payload) {
    this.logger.log(user.userId);
    this.validateUserMode(user, 'user');
    return await this.usersService.getUser(user.userId);
  }
  @Post('/user/receiver')
  async createReceiver(
    @GetUser() user: Payload,
    @Body() body: CreateReceiverDto,
  ) {
    this.validateUserMode(user, 'user');
    return await this.usersService.createReceiver(user.userId, body);
  }

  @Get('/helper/request/all')
  async getAllRequests(@GetUser() user: Payload) {
    this.validateUserMode(user, 'helper');
    return await this.usersService.getAllRequests(user.userId);
  }

  @Post('/helper/request')
  async createRequest(
    @GetUser() user: Payload,
    @Body() body: CreateRequestDto,
  ) {
    this.validateUserMode(user, 'helper');
    return await this.usersService.createRequest(user.userId, body);
  }

  @Get('/helper')
  async getHelpers(@GetUser() user: Payload) {
    this.validateUserMode(user, 'helper');
    return await this.usersService.getHelper(user.userId);
  }

  @Post('/helper')
  async registerHelper(
    @GetUser() user: Payload,
    @Body() body: CreateHelperDto,
  ) {
    this.validateUserMode(user, 'helper');
    return await this.usersService.registerHelper(user.userId, body);
  }
}
