import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor() {}

  @Get('google')
  @UseGuards(GoogleGuard)
  async test(@Req() req, @Res() res: Response) {
    console.log(req.user);
    return res.redirect(process.env.FRONTEND_URL);
  }
}
