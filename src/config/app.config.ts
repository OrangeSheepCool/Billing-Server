import { registerAs } from '@nestjs/config';

import { APP_CONFIG } from '@/constants';

const { token, port, prefix } = APP_CONFIG;

export default registerAs<Config.App>(token, () => ({
  port: Number(process.env.PORT) || port,
  prefix: process.env.PREFIX || prefix,
}));
