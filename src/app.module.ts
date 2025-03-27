import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from 'configs/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
