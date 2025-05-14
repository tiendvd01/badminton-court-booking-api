import { Injectable } from "@nestjs/common";
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
        return this.ownerPaymentRepository.find();
    }

    async findOne(id: number): Promise<OwnerPayment> {
        return this.ownerPaymentRepository.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<OwnerPayment>): Promise<OwnerPayment> {
        await this.ownerPaymentRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.ownerPaymentRepository.delete(id);
    }
}
