import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const SocialUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request);
    return request.user;
  },
);

export interface OuathUserType {
  email: string;
  name: string;
  picture: string;
}
