import { Injectable, NotFoundException } from '@nestjs/common';
import { Like, Raw, Repository } from 'typeorm';
import { Booking } from './entity/booking.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from './entity/booking.entity';
import { NotificationsGateway } from 'common/websocket/NotificationsGateway';
import { NotificationService } from '@modules/notification/notification.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CourtService } from '@modules/court/court.service';
import { PriceTableService } from '@modules/price-table/price-table.service';
import { generateUniqueCode } from 'utils';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    private courtService: CourtService,
    private priceTableService: PriceTableService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createBooking(bookingData: CreateBookingDto): Promise<Booking> {

    let totalPrice = 0;
    for (const slot of bookingData.slots) {
      const court = await this.courtService.findCourtById(slot.courtId);
      const priceTable = await this.priceTableService.findPriceTableById(court.price_table_id);

      const [startHours, startMinutes] = slot.startTime.split(':').map(Number);
      const [endHours, endMinutes] = slot.endTime.split(':').map(Number);

      // Calculate duration in hours
      const startDate = new Date();
      startDate.setHours(startHours, startMinutes, 0, 0);
      
      const endDate = new Date();
      endDate.setHours(endHours, endMinutes, 0, 0);
      
      const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);

      // Find matching price for the time slot
      const price = priceTable.prices.find((item) => {
        const [itemStartHours, itemStartMinutes] = item.start_time.split(':').map(Number);
        const [itemEndHours, itemEndMinutes] = item.end_time.split(':').map(Number);
        
        const priceStart = new Date().setHours(itemStartHours, itemStartMinutes);
        const priceEnd = new Date().setHours(itemEndHours, itemEndMinutes);
        const slotStart = new Date().setHours(startHours, startMinutes);
        const slotEnd = new Date().setHours(endHours, endMinutes);
        
        // Check if the booking slot is within the price time range
        return slotStart >= priceStart && slotEnd <= priceEnd;
      });
      
      // Calculate price for this slot (price per hour * duration)
      totalPrice += (price?.price || 0) * durationHours;
    }

    const booking = this.bookingRepository.create({
      slots: bookingData.slots.map((slot) => ({
        court_id: slot.courtId,
        start_time: slot.startTime,
        end_time: slot.endTime,
      })),
      total_price: totalPrice,
      customer_info: bookingData.customer_info,
      booking_date: new Date(bookingData.booking_date),
      note: bookingData.note,
      status: BookingStatus.PENDING,
      booking_code: generateUniqueCode(),
    });
    
    const savedBooking = await this.bookingRepository.save(booking);

    // Send notification to owner
    if (booking.slots[0].court_id) {
      const court = await this.courtService.findCourtById(booking.slots[0].court_id);
      this.notificationsGateway.sendToUser(
        'new-booking',
        court.location.owner_id.toString(),
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
