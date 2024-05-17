import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from 'src/customer/customer.service';
import { HelperService } from 'src/helper/helper.service';
import { OuathUserType } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Payload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => HelperService))
    private readonly helperService: HelperService,
    @Inject(forwardRef(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
  ) {}
  async helperLogin(oauthUser: OuathUserType) {
    this.logger.log(oauthUser.email);
    return await this.validUser(oauthUser.email, 'helper');
  }

  async userLogin(oauthUser: OuathUserType) {
    this.logger.log(oauthUser.email);
    return await this.validUser(oauthUser.email, 'user');
  }

  async validUser(email: string, mode: 'user' | 'helper'): Promise<User> {
    // Check if the user exists in the database
    const user = await this.usersService.findUserByEmail(email);
    // If the user does not exist, create a new user
    if (!user) {
      const newUser = await this.usersService.createUser(email);
      if (mode === 'user') {
        newUser.customer = await this.customerService.createCustomer();
      } else {
        newUser.helper = await this.helperService.createHelper();
      }
      return this.usersService.updateUser(newUser);
    }
    return user;
  }

  async makeToken(userId: number, mode: 'user' | 'helper') {
    const payload: Payload = {
      userId,
      mode,
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }
}
