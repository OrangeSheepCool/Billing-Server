import { registerAs } from '@nestjs/config';
import { decode } from 'js-base64';

import { MYSQL_CONFIG } from '@/constants';

const { token, host, port, username, password, database, entities } =
  MYSQL_CONFIG;

export default registerAs<Config.Mysql>(token, () => ({
  host: process.env.MYSQL_HOST || host,
  port: Number(process.env.MYSQL_PORT) || port,
  username: process.env.MYSQL_USERNAME || username,
  password: decode(process.env.MYSQL_PASSWORD || password),
  database: process.env.MYSQL_DATABASE || database,
  entities,
}));
