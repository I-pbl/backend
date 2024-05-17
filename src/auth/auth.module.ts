import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';
import { GoogleHelperStrategy } from './strategies/google-helper.strategy';
import { GoogleUserStrategy } from './strategies/google-user.strategy';
import { HelperModule } from 'src/helper/helper.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {},
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => CustomerModule),
    forwardRef(() => HelperModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleHelperStrategy, GoogleUserStrategy, JwtGuard],
})
export class AuthModule {}
