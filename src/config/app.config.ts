import { registerAs } from '@nestjs/config';

import { ConfConstant } from '@/constants';

const { APP_CONFIG } = ConfConstant;

export default registerAs<Config.App>(APP_CONFIG.TOEKN, () => ({
  port: Number(process.env.PORT) || APP_CONFIG.PORT,
}));
