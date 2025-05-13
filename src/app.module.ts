import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'db/database';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CourtModule } from '@modules/court/court.module';
import { BookingModule } from '@modules/booking/booking.module';
import { OwnerPaymentModule } from './modules/owner-payments/owner-payment.module';

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
    CourtModule,
    BookingModule,
    OwnerPaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
