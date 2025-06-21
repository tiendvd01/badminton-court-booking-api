import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking } from './entity/booking.entity';
import { CourtModule } from '@modules/court/court.module';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';
import { NotificationModule } from '@modules/notification/notification.module';
import { PriceTableModule } from '@modules/price-table/price-table.module';
import { BullModule } from '@nestjs/bull';
import { MyQueueProcessor } from './queue/booking.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: "cancel-pending-booking"
    }),
    TypeOrmModule.forFeature([Booking]),
    CourtModule,
    NotificationModule,
    PriceTableModule
  ],
  controllers: [BookingController],
  providers: [
    BookingService, 
    NotificationsGateway,
    MyQueueProcessor, // Add the queue processor to providers
  ],
  exports: [BookingService],
})
export class BookingModule { }
