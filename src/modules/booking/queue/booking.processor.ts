
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { BookingService } from '../booking.service';
import { BookingStatus } from '../entity/booking.entity';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';

@Processor('cancel-pending-booking')
export class MyQueueProcessor {
  constructor(
    private readonly bookingService: BookingService,
    private readonly notificationGateway: NotificationsGateway,
  ) { }
  @Process('cancel-pending-booking')
  async handleJob(job: Job) {
    const booking = await this.bookingService.findBookingById(job.data.bookingId);
    if (booking.status === BookingStatus.PENDING) {
      await this.bookingService.updateBookingStatus(job.data.bookingId, BookingStatus.CANCELLED);
      console.log("Booking cancelled: ", booking.id);
      this.notificationGateway.sendToUser(
        'booking-cancelled',
        booking.customer_id.toString(),
        {
          booking,
        },
      );
    }
  }
}
