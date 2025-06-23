import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'db/database';
import { JwtModule } from '@nestjs/jwt';
import { CourtModule } from '@modules/court/court.module';
import { BookingModule } from '@modules/booking/booking.module';
import { OwnerPaymentModule } from './modules/owner-payments/owner-payment.module';
import { UploadModule } from '@modules/upload/upload.module';
import { PriceTableModule } from '@modules/price-table/price-table.module';
import { NotificationModule } from '@modules/notification/notification.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
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
    NotificationModule,
    UserModule,
    CourtModule,
    BookingModule,
    OwnerPaymentModule,
    UploadModule,
    PriceTableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
