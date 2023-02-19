import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { decode } from 'js-base64';

import { JWT_EXPIRESIN, JWT_SECRET } from '@/constants';
import { AuthController } from '@/controllers';
import { Auth } from '@/entities';
import { HashMiddleware } from '@/middlewares';
import { AuthService } from '@/services';
import { JwtStrategy, LocalStrategy } from '@/strategies';
import { UserModule } from './user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: decode(JWT_SECRET),
      signOptions: {
        expiresIn: JWT_EXPIRESIN,
      },
    }),
    TypeOrmModule.forFeature([Auth]),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashMiddleware).forRoutes({
      path: '/auth/signup',
      method: RequestMethod.POST,
    });
  }
}
