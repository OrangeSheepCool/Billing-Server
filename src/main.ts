import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ConfConstant } from '@/constants';

const { APP_CONFIG } = ConfConstant;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configServ = app.get(ConfigService);
  const { port } = configServ.get<Config.App>(APP_CONFIG.TOEKN) || {
    port: APP_CONFIG.PORT,
  };

  await app.listen(port);
}

bootstrap();
