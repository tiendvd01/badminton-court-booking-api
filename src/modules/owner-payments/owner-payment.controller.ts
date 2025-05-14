import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { OwnerPaymentService } from "./owner-payment.service";
import { OwnerPayment } from "./entity/owner-payment.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('owner-payments')
@Controller("owner-payments")
export class OwnerPaymentController {
    constructor(private readonly ownerPaymentService: OwnerPaymentService) {}

    @Post()
    async create(@Body() data: Partial<OwnerPayment>): Promise<OwnerPayment> {
        return this.ownerPaymentService.create(data);
    }

    @Get()
    async findAll(): Promise<OwnerPayment[]> {
        return this.ownerPaymentService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number): Promise<OwnerPayment> {
        return this.ownerPaymentService.findOne(id);
    }

    @Put(":id")
    async update(
        @Param("id") id: number,
        @Body() data: Partial<OwnerPayment>
    ): Promise<OwnerPayment> {
        return this.ownerPaymentService.update(id, data);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        return this.ownerPaymentService.delete(id);
    }
}
