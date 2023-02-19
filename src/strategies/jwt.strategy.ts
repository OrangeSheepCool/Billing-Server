import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { decode } from 'js-base64';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JWT_SECRET } from '@/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: decode(JWT_SECRET),
    });
  }

  validate(payload: Record<string, unknown>): Record<string, unknown> {
    return payload;
  }
}
