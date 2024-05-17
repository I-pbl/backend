import { Injectable } from '@nestjs/common';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class GoogleUserStrategy extends PassportStrategy(
  Strategy,
  'google-user',
) {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_USER_CALLBACK_URL,
      scope: ['email', 'profile'],
      // passReqToCallback: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log('req is ', req);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
    };
    return user;
  }
}
