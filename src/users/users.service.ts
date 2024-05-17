import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(email: string): Promise<User> {
    const newUser = this.userRepository.create({
      email,
    });
    try {
      const user = this.userRepository.save(newUser);
      return user;
    } catch (error) {
      this.logger.error(error.message);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['customer', 'helper'],
    });
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
