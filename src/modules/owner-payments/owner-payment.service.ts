import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OwnerPaymentInfo } from "./entity/owner-payment.entity";

@Injectable()
export class OwnerPaymentService {
    constructor(
        @InjectRepository(OwnerPaymentInfo)
        private readonly ownerPaymentRepository: Repository<OwnerPaymentInfo>
    ) {}

    async create(data: Partial<OwnerPaymentInfo>): Promise<OwnerPaymentInfo> {
        return this.ownerPaymentRepository.save(data);
    }

    async findAll(): Promise<OwnerPaymentInfo[]> {
        return this.ownerPaymentRepository.find();
    }

    async findOne(id: number): Promise<OwnerPaymentInfo> {
        return this.ownerPaymentRepository.findOne({ where: { id } });
    }

    async update(id: number, data: Partial<OwnerPaymentInfo>): Promise<OwnerPaymentInfo> {
        await this.ownerPaymentRepository.update(id, data);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.ownerPaymentRepository.delete(id);
    }
}
