import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleHelperGuard, GoogleUserGuard } from './auth.guard';
import { OuathUserType, SocialUser } from 'src/users/decorators/user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Get('user/google')
  @UseGuards(GoogleUserGuard)
  async userLoginWithGoogle(@Req() req) {}
  @Get('user/google/callback')
  @UseGuards(GoogleUserGuard)
  async userLoginCallback(
    @Req() req,
    @Res() res,
    @SocialUser() socialUser: OuathUserType,
  ) {
    this.logger.log('user login with google');
    this.logger.log(socialUser);

    const user = await this.authService.userLogin(socialUser);
    const token = await this.authService.makeToken(user.id, 'user');
    console.log(token);
    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      sameSite: 'none',
    });
    res.redirect(process.env.FRONTEND_URL + 'user');
  }

  @Get('helper/google')
  @UseGuards(GoogleHelperGuard)
  async helperLoginWithGoogle(@Req() req) {}
  @Get('helper/google/callback')
  @UseGuards(GoogleHelperGuard)
  async helperLoginCallback(
    @Req() req,
    @Res() res,
    @SocialUser() socialUser: OuathUserType,
  ) {
    this.logger.log('helper login with google');
    this.logger.log(socialUser);
    const user = await this.authService.helperLogin(socialUser);
    const token = await this.authService.makeToken(user.id, 'helper');

    res.cookie('accessToken', token, {
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.redirect(process.env.FRONTEND_URL + 'helper');
  }
}
