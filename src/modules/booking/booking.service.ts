import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Booking } from "./entity/booking.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
    ) {}

    async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
        const booking = this.bookingRepository.create(bookingData);
        return this.bookingRepository.save(booking);
    }

    async findAllBookings(): Promise<Booking[]> {
        return this.bookingRepository.find({ relations: ["payments"] });
    }

    async findBookingById(id: number): Promise<Booking> {
        const booking = await this.bookingRepository.findOne({
            where: { id },
            relations: ["payments"],
        });
        if (!booking) {
            throw new NotFoundException(`Booking with ID ${id} not found`);
        }
        return booking;
    }

    async updateBooking(id: number, updateData: Partial<Booking>): Promise<Booking> {
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
}