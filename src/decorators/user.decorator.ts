import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const ReqUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest<Request>();
    if (!user) return null;

    return data ? (user as Record<string, unknown>)[data] : user;
  },
);
