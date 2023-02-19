import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { EXCEPTION_MSG } from '@/constants';
import { CreateUserDto, UpdateUserDto } from '@/dto';
import { User } from '@/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(field: 'id' | 'username', value: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ [field]: value });
  }

  async checkOne(
    { username }: CreateUserDto | UpdateUserDto,
    id?: string,
  ): Promise<void> {
    if (!username) return;

    const user: User | null = await this.findOne('username', username);
    if (!user) return;
    if (id && user.id === id) return;

    throw new BadRequestException(EXCEPTION_MSG.IDENTIFIER_USED('用户名'));
  }

  async saveOne(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async updateOne(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.checkOne(updateUserDto, id);

    return await this.userRepository.update(id, updateUserDto);
  }
}
