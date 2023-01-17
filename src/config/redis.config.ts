import { registerAs } from '@nestjs/config';

import { ConfConstant } from '@/constants';

const { REDIS_CONFIG } = ConfConstant;

export default registerAs<Config.Redis>(REDIS_CONFIG.TOKEN, () => ({
  host: process.env.REDIS_HOST || REDIS_CONFIG.HOST,
  port: Number(process.env.REDIS_PORT) || REDIS_CONFIG.PORT,
}));
