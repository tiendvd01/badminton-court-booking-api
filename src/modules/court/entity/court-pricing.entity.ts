import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Court } from "./court.entity";

@Entity()
export class CourtPricing {
    @PrimaryGeneratedColumn("uuid") // Changed to UUID
    id: string;

    @Column()
    court_id: string;

    @Column({ type: "timestamp" }) // Added for start_time
    start_time: string;

    @Column({ type: "time" }) // Added for end_time
    end_time: string;

    @Column({ type: "decimal" }) // Added for price_per_hour
    price_per_hour: number;

    @CreateDateColumn() // Added for created_at
    created_at: Date;

    @UpdateDateColumn() // Added for updated_at
    updated_at: Date;

    @ManyToOne(() => Court)
    @JoinColumn({ name: "court_id" })
    court: Court;
}
