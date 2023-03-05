import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { EXCEPTION_MSG } from '@/constants';
import { validateEmail, validatePhone } from '@/utils';

const saltRounds = 10;

@Injectable()
export class HashMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { identity, credential }: { identity?: string; credential?: string } =
      req.body;
    const inputInvalidException: BadRequestException = new BadRequestException(
      EXCEPTION_MSG.INPUT_INVALID,
    );

    if (!identity) return next(inputInvalidException);
    if (!validateEmail(identity) && !validatePhone(identity))
      return next(inputInvalidException);
    if (!credential) return next(inputInvalidException);

    const salt: string = genSaltSync(saltRounds);
    const hashed: string = hashSync(credential, salt);
    req.body.credential = hashed;

    next();
  }
}
