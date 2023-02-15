import { registerAs } from '@nestjs/config';

import { REDIS_CONFIG } from '@/constants';

const { token, host, port, db } = REDIS_CONFIG;

export default registerAs<Config.Redis>(token, () => ({
  host: process.env.REDIS_HOST || host,
  port: Number(process.env.REDIS_PORT) || port,
  db: Number(process.env.REDIS_DB) || db,
}));
