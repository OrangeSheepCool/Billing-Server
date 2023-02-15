import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { APP_CONFIG } from '@/constants';

const { token, ...options } = APP_CONFIG;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const { port } = configService.get<Config.App>(token) || options;

  await app.listen(port);
}

bootstrap();
