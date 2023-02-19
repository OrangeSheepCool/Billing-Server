import { Body, Controller, Put, UseGuards } from '@nestjs/common';

import { ReqUser } from '@/decorators';
import { UpdateUserDto } from '@/dto';
import { JwtGuard } from '@/guards';
import { UserService } from '@/services';
import { UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Put()
  async updateOne(
    @ReqUser('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateOne(id, body);
  }
}
