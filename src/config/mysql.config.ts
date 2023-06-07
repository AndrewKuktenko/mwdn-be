import { registerAs } from '@nestjs/config';
import * as process from 'process';

export const mysqlConfig = registerAs('mysql', () => ({
  host: process.env.MYSQL_DB_HOST,
  port: process.env.MYSQL_DB_PORT,
  username: process.env.MYSQL_DB_USERNAME,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_DATABASE,
}));
