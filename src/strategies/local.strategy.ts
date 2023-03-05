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
    super({
      usernameField: 'identity',
      passwordField: 'credential',
    });
  }

  async validate(identity: string, credential: string): Promise<User> {
    const auth: Auth | null = await this.authService.findOne(identity);

    if (!auth)
      throw new UnauthorizedException(
        ACCOUNT_NOT_FOUND(determineIdentityName(identity)),
      );

    if (!compareSync(credential, auth.credential))
      throw new UnauthorizedException(ACCOUNT_NOT_MATCHED);

    return auth.user;
  }
}
