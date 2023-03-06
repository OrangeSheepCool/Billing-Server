import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { encode } from 'js-base64';
import { omit, pick } from 'lodash';
import { Repository } from 'typeorm';

import { EXCEPTION_MSG, RESPONSE_MSG } from '@/constants';
import { CreateAuthDto, CreateUserDto, UpdateAuthDto } from '@/dto';
import { Auth, User } from '@/entities';
import { AuthIdentifier } from '@/enums';
import { determineIdentityEnum, determineIdentityName } from '@/utils';
import { UserService } from './user.service';

const { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } = RESPONSE_MSG;

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async findOne(identity: string): Promise<Auth | null> {
    return await this.authRepository.findOne({
      where: { identity },
      relations: ['user'],
    });
  }

  async checkOne(
    { identity }: CreateAuthDto | UpdateAuthDto,
    id?: string,
  ): Promise<void> {
    if (!identity) return;

    const auth: Auth | null = await this.findOne(identity);
    if (!auth) return;
    if (id && auth.id === id) return;

    throw new BadRequestException(
      EXCEPTION_MSG.IDENTIFIER_USED(determineIdentityName(identity)),
    );
  }

  async saveOne(createAuthDto: CreateAuthDto, user: User): Promise<Auth> {
    const identifier: AuthIdentifier = determineIdentityEnum(
      createAuthDto.identity,
    );

    const auth: Auth = this.authRepository.create({
      ...createAuthDto,
      identifier,
      user,
    });

    return await this.authRepository.save(auth);
  }

  signIn(user: User): SignInResponse {
    const { id } = user;

    return {
      data: {
        access_token: encode(this.jwtService.sign({ id })),
      },
      message: SIGN_IN_SUCCESS,
    };
  }

  async signUp(
    payload: CreateAuthDto & CreateUserDto,
  ): Promise<SignUpResponse> {
    const authFields = ['identity', 'credential'] as const;
    const createUserDto = omit(payload, authFields);
    const createAuthDto = pick(payload, authFields);

    await Promise.all([
      this.userService.checkOne(createUserDto),
      this.checkOne(createAuthDto),
    ]);

    const user: User = await this.userService.saveOne({
      username: createUserDto.username || createAuthDto.identity,
      avatar: createUserDto.avatar,
    });
    await this.saveOne(createAuthDto, user);

    return {
      message: SIGN_UP_SUCCESS,
    };
  }
}
