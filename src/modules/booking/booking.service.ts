import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Raw, Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from './entity/booking.entity';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingData);
    const savedBooking = await this.bookingRepository.save(booking);

    // Send notification to owner
    if (savedBooking.court?.location?.owner_id) {
      this.notificationsGateway.sendToUser(
        'new-booking',
        savedBooking.court.location.owner_id.toString(),
        {
          message: 'A new booking has been created for your court',
          booking: savedBooking,
        },
      );
    }

    return savedBooking;
  }

  async findAllBookings(filters?: {
    customerName?: string;
    bookingDate?: string;
    status?: string;
  }): Promise<Booking[]> {
    const where: any = {};

    if (filters) {
      if (filters.customerName) {
        where.customer_name = Like(`%${filters.customerName}%`);
      }

      if (filters.bookingDate) {
        where.start_time = Raw((alias) => `DATE(${alias}) = :date`, {
          date: filters.bookingDate,
        });
      }

      if (filters.status) {
        where.status = filters.status;
      }
    }

    return this.bookingRepository.find({
      where,
    });
  }

  async findBookingById(id: number): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
    return booking;
  }

  async updateBooking(
    id: number,
    updateData: Partial<Booking>,
  ): Promise<Booking> {
    const booking = await this.findBookingById(id);
    Object.assign(booking, updateData);
    return this.bookingRepository.save(booking);
  }

  async deleteBooking(id: number): Promise<void> {
    const result = await this.bookingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }
  }

  async updateBookingStatus(
    id: number,
    status: BookingStatus,
  ): Promise<Booking> {
    const booking = await this.findBookingById(id);
    booking.status = status;
    return this.bookingRepository.save(booking);
  }
}
