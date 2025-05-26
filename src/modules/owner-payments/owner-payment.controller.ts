import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Req } from "@nestjs/common";
import { OwnerPaymentService } from "./owner-payment.service";
import { OwnerPayment } from "./entity/owner-payment.entity";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthGuard } from "common/guards/auth.guard";
import { RolesGuard } from "common/guards/roles.guard";
import { Roles } from "common/decorators/roles.decorator";
import { CreateOwnerPaymentDto } from "./dto/create-owner-payment.dto";
import { Request } from "express";

@ApiTags('owner-payments')
@Controller("owner-payments")
export class OwnerPaymentController {
    constructor(private readonly ownerPaymentService: OwnerPaymentService) {}

    @Post()
    @ApiBearerAuth()
    @Roles('admin', 'owner')
    @UseGuards(AuthGuard, RolesGuard)
    async create(@Body() data: CreateOwnerPaymentDto, @Req() req: Request): Promise<OwnerPayment> {
        // If user is owner, set owner_id to current user id
        if (req.user.role === 'owner') {
            data.owner_id = req.user.id.toString();
        }
        return this.ownerPaymentService.create(data);
    }

    @Get()
    async findAll(@Query('ownerId') ownerId?: string): Promise<OwnerPayment[]> {
        if (ownerId) {
            return this.ownerPaymentService.findByOwnerId(ownerId);
        }
        return this.ownerPaymentService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number): Promise<OwnerPayment> {
        return this.ownerPaymentService.findOne(id);
    }

    @Put(":id")
    @ApiBearerAuth()
    @Roles('admin', 'owner')
    @UseGuards(AuthGuard, RolesGuard)
    async update(
        @Param("id") id: number,
        @Body() data: Partial<CreateOwnerPaymentDto>,
        @Req() req: any
    ): Promise<OwnerPayment> {
        // Check if user is owner and trying to update someone else's payment
        const payment = await this.ownerPaymentService.findOne(id);
        if (req.user.role === 'owner' && payment.owner_id !== req.user.id) {
            throw new Error('You are not authorized to update this payment method');
        }
        
        return this.ownerPaymentService.update(id, data);
    }

    @Delete(":id")
    @ApiBearerAuth()
    @Roles('admin', 'owner')
    @UseGuards(AuthGuard, RolesGuard)
    async delete(@Param("id") id: number, @Req() req: any) {
        // Check if user is owner and trying to delete someone else's payment
        const payment = await this.ownerPaymentService.findOne(id);
        if (req.user.role === 'owner' && payment.owner_id !== req.user.id) {
            throw new Error('You are not authorized to delete this payment method');
        }
        
        return this.ownerPaymentService.delete(id);
    }
}
