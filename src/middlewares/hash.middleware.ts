import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { EXCEPTION_MSG } from '@/constants';

const saltRounds = 10;

@Injectable()
export class HashMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const credential: string | undefined = req.body.credential;
    if (!credential)
      return next(new BadRequestException(EXCEPTION_MSG.INPUT_INVALID));

    const salt: string = genSaltSync(saltRounds);
    const hashed: string = hashSync(credential, salt);
    req.body.credential = hashed;

    next();
  }
}
