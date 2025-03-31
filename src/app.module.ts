import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'configs/database';
import { JwtModule, JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          issuer: "Tiến ĐVD"
        },
      }),
      global: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
