import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';
import { CourtModule } from '@modules/court/court.module';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), CourtModule],
  controllers: [BookingController],
  providers: [BookingService, NotificationsGateway],
  exports: [BookingService],
})
export class BookingModule {}
