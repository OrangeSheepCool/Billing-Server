import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConfigConstant } from '@/constants';

const {
  APP_CONFIG: { token, ...options },
} = ConfigConstant;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const { port } = configService.get<Config.App>(token) || options;

  await app.listen(port);
}

bootstrap();
