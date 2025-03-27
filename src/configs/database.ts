import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const databaseConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: Number(process.env.PORT),
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    migrationsTableName: "custom_migration_table",
};

console.log("database", databaseConfig);

export default databaseConfig;
