declare namespace Config {
  type App = {
    port: number;
    prefix: string;
  };

  type Mysql = {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
  };

  type Redis = {
    host: string;
    port: number;
    db: number;
  };
}
