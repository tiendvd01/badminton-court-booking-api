
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
    try {
    const booking = await this.bookingService.findBookingById(job.data.bookingId);
    if (booking.status === BookingStatus.PENDING) {
      await this.bookingService.updateBookingStatus(job.data.bookingId, BookingStatus.CANCELLED);
      console.log("Booking cancelled: ", booking.id);
      this.notificationGateway.broadcast('revalidate');
    } else {
      console.log('Booking not in PENDING status, skipping:', booking.id);
    }
    } catch (error) {
      console.error('Error processing job:', error);
      throw error; // This will trigger a retry if attempts > 1
    }
  }
}
