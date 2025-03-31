import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { User } from "../../user/user.entity";
import { Court } from "../../court/entity/court.entity";
import { Payment } from "./payment.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    customer_id: string;

    @Column()
    court_id: string;

    @Column({ type: "date" })
    booking_date: Date;

    @Column({ type: "time" })
    start_time: string;

    @Column({ type: "time" })
    end_time: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_price: number;

    @Column({
        type: "enum",
        enum: ["pending", "completed", "failed"],
        default: "pending"
    })
    status: string;

    @Column({ nullable: true })
    note: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "customer_id" })
    customer: User;

    @ManyToOne(() => Court)
    @JoinColumn({ name: "court_id" })
    court: Court;

    @OneToMany(() => Payment, payment => payment.booking)
    payments: Payment[];
} 