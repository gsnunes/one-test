import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'main',
  synchronize: true,
  entities: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  migrations: [path.resolve(__dirname, '..', 'db', 'models', '*')],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

module.exports = options;
