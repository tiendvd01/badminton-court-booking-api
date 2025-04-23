import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Booking } from "./entity/booking.entity";
import { Payment } from "./entity/payment.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BookingService {
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) {}

    // Create a new booking
    async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
        const booking = this.bookingRepository.create(bookingData);
        return this.bookingRepository.save(booking);
    }

    // Retrieve all bookings
    async findAllBookings(): Promise<Booking[]> {
        return this.bookingRepository.find({ relations: ["payments"] });
    }

    // Retrieve a single booking by ID
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

    // Update a booking by ID
    async updateBooking(id: number, updateData: Partial<Booking>): Promise<Booking> {
        const booking = await this.findBookingById(id);
        Object.assign(booking, updateData);
        return this.bookingRepository.save(booking);
    }

    // Delete a booking by ID
    async deleteBooking(id: number): Promise<void> {
        const result = await this.bookingRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Booking with ID ${id} not found`);
        }
    }

    // Payment CRUD
    async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
        const payment = this.paymentRepository.create(paymentData);
        return this.paymentRepository.save(payment);
    }

    async findAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.find({ relations: ['booking'] });
    }

    async findPaymentById(id: number): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['booking'],
        });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    async updatePayment(id: number, updateData: Partial<Payment>): Promise<Payment> {
        const payment = await this.findPaymentById(id);
        Object.assign(payment, updateData);
        return this.paymentRepository.save(payment);
    }

    async deletePayment(id: number): Promise<void> {
        const result = await this.paymentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
    }
}