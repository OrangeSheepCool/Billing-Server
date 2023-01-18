import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Appconfig, Mysqlconfig, Redisconfig } from '@/config';
import { ConfigConstant } from '@/constants';

const {
  MYSQL_CONFIG: { token, ...options },
} = ConfigConstant;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ConfigConstant.ENV_CONFIG.dev_path,
      isGlobal: true,
      load: [Appconfig, Mysqlconfig, Redisconfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        synchronize: true,
        ...(configService.get<Config.Mysql>(token) || options),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
