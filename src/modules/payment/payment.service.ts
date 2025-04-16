import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Payment } from "@modules/booking/entity/payment.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>,
    ) {}

    // Create a new payment
    async createPayment(paymentData: Partial<Payment>): Promise<Payment> {
        const payment = this.paymentRepository.create(paymentData);
        return this.paymentRepository.save(payment);
    }

    // Retrieve all payments
    async findAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.find();
    }

    // Retrieve a single payment by ID
    async findPaymentById(id: number): Promise<Payment> {
        const payment = await this.paymentRepository.findOne({ where: { id } });
        if (!payment) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }

    // Update a payment by ID
    async updatePayment(id: number, updateData: Partial<Payment>): Promise<Payment> {
        const payment = await this.findPaymentById(id);
        Object.assign(payment, updateData);
        return this.paymentRepository.save(payment);
    }

    // Delete a payment by ID
    async deletePayment(id: number): Promise<void> {
        const result = await this.paymentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Payment with ID ${id} not found`);
        }
    }
}