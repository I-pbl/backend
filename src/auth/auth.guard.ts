import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleHelperGuard extends AuthGuard('google-helper') {}

@Injectable()
export class GoogleUserGuard extends AuthGuard('google-user') {}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {}
