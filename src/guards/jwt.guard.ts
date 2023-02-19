import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { decode } from 'js-base64';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest<Request>();

    const { authorization }: IncomingHttpHeaders = headers;
    if (!authorization) return false;

    const [feature, token] = authorization.split(' ');
    headers.authorization = `${feature} ${decode(token)}`;

    return super.canActivate(context);
  }
}
