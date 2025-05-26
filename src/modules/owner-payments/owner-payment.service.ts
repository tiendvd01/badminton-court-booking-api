import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OwnerPayment } from "./entity/owner-payment.entity";

@Injectable()
export class OwnerPaymentService {
    constructor(
        @InjectRepository(OwnerPayment)
        private readonly ownerPaymentRepository: Repository<OwnerPayment>
    ) {}

    async create(data: Partial<OwnerPayment>): Promise<OwnerPayment> {
        return this.ownerPaymentRepository.save(data);
    }

    async findAll(): Promise<OwnerPayment[]> {
        return this.ownerPaymentRepository.find({
            relations: ['owner']
        });
    }

    async findByOwnerId(ownerId?: string): Promise<OwnerPayment[]> {
        return this.ownerPaymentRepository.find({
            where: { owner_id: ownerId },
            relations: ['owner']
        });
    }

    async findOne(id: number): Promise<OwnerPayment> {
        const payment = await this.ownerPaymentRepository.findOne({ 
            where: { id },
            relations: ['owner']
        });
        
        if (!payment) {
            throw new NotFoundException(`Owner payment with ID ${id} not found`);
        }
        
        return payment;
    }

    async update(id: number, data: Partial<OwnerPayment>): Promise<OwnerPayment> {
        await this.ownerPaymentRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number) {
        const result = await this.ownerPaymentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Owner payment with ID ${id} not found`);
        }
        return result;
    }
}
