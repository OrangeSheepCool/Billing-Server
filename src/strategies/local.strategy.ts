import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { compareSync } from 'bcrypt';
import { Strategy } from 'passport-local';

import { EXCEPTION_MSG } from '@/constants';
import { Auth, User } from '@/entities';
import { AuthService } from '@/services';
import { determineIdentityName } from '@/utils';

const { ACCOUNT_NOT_FOUND, ACCOUNT_NOT_MATCHED } = EXCEPTION_MSG;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    const auth: Auth | null = await this.authService.findOne(username);

    if (!auth)
      throw new UnauthorizedException(
        ACCOUNT_NOT_FOUND(determineIdentityName(username)),
      );

    if (!compareSync(password, auth.credential))
      throw new UnauthorizedException(ACCOUNT_NOT_MATCHED);

    return auth.user;
  }
}
