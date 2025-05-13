import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';

dotenv.config();

const baseConfig: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsTableName: "custom_migration_table",
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: false,
    seeds: [join(__dirname, 'seeders', '*{.ts,.js}')],
    factories: [join(__dirname, 'factories', '*.factory{.ts,.js}')],
};

export const databaseConfig = new DataSource(baseConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
    ...baseConfig,
    autoLoadEntities: true,
} as TypeOrmModuleOptions;
