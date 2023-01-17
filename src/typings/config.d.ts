declare namespace Config {
  type App = {
    port: number;
  };

  type Mysql = {
    host: string;
    port: number;
    username: string;
    password: string;
  }

  type Redis = {
    host: string;
    port: number;
  }
}
