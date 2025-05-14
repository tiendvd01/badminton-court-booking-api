import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { CreateAdminUser1747185494888 } from './seeds/1747185494888-create_admin_user';

dotenv.config();

const baseConfig: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrationsTableName: "custom_migration_table",
    entities: [join(__dirname, '../modules/**/entity/*.entity{.ts,.js}')],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
    synchronize: false,
    seeds: [CreateAdminUser1747185494888],
    factories: [join(__dirname, 'factories', '*.factory{.ts,.js}')],
};

export const databaseConfig = new DataSource(baseConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
    ...baseConfig,
    autoLoadEntities: true,
} as TypeOrmModuleOptions;
