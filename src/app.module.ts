import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfConstant } from '@/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ConfConstant.ENV_CONFIG.FILE_PATH,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
