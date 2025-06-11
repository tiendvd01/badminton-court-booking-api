import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Court } from "../../court/entity/court.entity";

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Slot {
  court_id: number;
  start_time: string;
  end_time: string;
}

@Entity('bookings')
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    customer_id?: number;

    @Column({ type: "json" })
    customer_info?: {
        name: string;
        phone_number: string;
    };

    @Column({ type: "date" })
    booking_date: Date;

    @Column({ type: "json" })
    slots: Slot[];

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_price: number;

    @Column({
        type: "enum",
        enum: BookingStatus,
        default: BookingStatus.PENDING,
    })
    status: BookingStatus;

    @Column({ nullable: true })
    note: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "customer_id" })
    customer?: User;

    @ManyToOne(() => Court)
    @JoinColumn({ name: "court_id" })
    court: Court;

    @Column()
    payment_image: string;
} 
