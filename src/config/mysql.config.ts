import { registerAs } from '@nestjs/config';

import { ConfConstant } from '@/constants';

const { MYSQL_CONFIG } = ConfConstant;

export default registerAs<Config.Mysql>(MYSQL_CONFIG.TOKEN, () => ({
  host: process.env.MYSQL_HOST || MYSQL_CONFIG.HOST,
  port: Number(process.env.MYSQL_PORT) || MYSQL_CONFIG.PORT,
  username: process.env.MYSQL_USERNAME || MYSQL_CONFIG.USERNAME,
  password: process.env.MYSQL_PASSWORD || MYSQL_CONFIG.PASSWORD,
}));
