import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { ReqUser } from '@/decorators';
import { CreateAuthDto, CreateUserDto } from '@/dto';
import { User } from '@/entities';
import { LocalGuard } from '@/guards';
import { AuthService } from '@/services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  signIn(@ReqUser() user: User) {
    return this.authService.signIn(user);
  }

  @Post('signup')
  async signUp(
    @Body()
    body: CreateAuthDto & CreateUserDto,
  ) {
    return await this.authService.signUp(body);
  }
}
