import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OwnerPaymentInfo } from "./entity/owner-payment.entity";
import { OwnerPaymentService } from "./owner-payment.service";
import { OwnerPaymentController } from "./owner-payment.controller";

@Module({
    imports: [TypeOrmModule.forFeature([OwnerPaymentInfo])],
    controllers: [OwnerPaymentController],
    providers: [OwnerPaymentService],
})
export class OwnerPaymentModule {}
