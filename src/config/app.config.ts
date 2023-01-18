import { registerAs } from '@nestjs/config';

import { ConfigConstant } from '@/constants';

const {
  APP_CONFIG: { token, port },
} = ConfigConstant;

export default registerAs<Config.App>(token, () => ({
  port: Number(process.env.PORT) || port,
}));
