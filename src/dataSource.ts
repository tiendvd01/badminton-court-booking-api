import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

export default new DataSource({
  url: process.env.DATABASE_URL,
  type: 'mysql',
  migrationsTableName: '_migrations',
  migrations: ['src/database/migrations/*.ts'],
  entities: ['src/**/*.entity.ts'],
});
