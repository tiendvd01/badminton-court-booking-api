import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Booking } from "./booking.entity";

@Entity()
export class Payment {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    booking_id: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: "enum",
        enum: ["pending", "completed", "failed"],
        default: "pending"
    })
    status: string;

    @Column({ nullable: true })
    payment_image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Booking, booking => booking.payments)
    @JoinColumn({ name: "booking_id" })
    booking: Booking;
} 