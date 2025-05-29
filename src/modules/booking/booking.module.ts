import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';
import { CourtModule } from '@modules/court/court.module';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';
import { NotificationService } from '@modules/notification/notification.service';
import { NotificationModule } from '@modules/notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), CourtModule, NotificationModule],
  controllers: [BookingController],
  providers: [BookingService, NotificationsGateway],
  exports: [BookingService],
})
export class BookingModule {}
