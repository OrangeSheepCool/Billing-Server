import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { APP_CONFIG } from '@/constants';
import { AppModule } from './app.module';

const { token, ...options } = APP_CONFIG;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  const { port, prefix } = configService.get<Config.App>(token) || options;

  app.setGlobalPrefix(prefix);

  await app.listen(port);
}

bootstrap();
