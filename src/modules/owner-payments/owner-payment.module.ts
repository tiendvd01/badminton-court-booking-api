import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OwnerPayment } from "./entity/owner-payment.entity";
import { OwnerPaymentService } from "./owner-payment.service";
import { OwnerPaymentController } from "./owner-payment.controller";

@Module({
    imports: [TypeOrmModule.forFeature([OwnerPayment])],
    controllers: [OwnerPaymentController],
    providers: [OwnerPaymentService],
})
export class OwnerPaymentModule {}
