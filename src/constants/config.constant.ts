export const ENV_CONFIG = {
  dev_path: '.development.env',
};

export const APP_CONFIG = {
  token: 'app',
  port: 3000,
};

export const MYSQL_CONFIG = {
  token: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Y3lzMTU4MzM0MTYyNQ==',
  database: 'billing',
  entities: ['dist/entities/**/*.entity.{js,ts}'],
};

export const REDIS_CONFIG = {
  token: 'redis',
  host: 'localhost',
  port: 6379,
  db: 10,
};
