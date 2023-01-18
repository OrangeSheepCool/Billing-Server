import { registerAs } from '@nestjs/config';

import { ConfigConstant } from '@/constants';

const {
  REDIS_CONFIG: { token, host, port, db },
} = ConfigConstant;

export default registerAs<Config.Redis>(token, () => ({
  host: process.env.REDIS_HOST || host,
  port: Number(process.env.REDIS_PORT) || port,
  db: Number(process.env.REDIS_DB) || db,
}));
