import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Location } from "./location.entity";

@Entity()
export class Court {
    @PrimaryGeneratedColumn("uuid") // Changed to UUID
    id: string;

    @Column()
    location_id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @CreateDateColumn() // Added for created_at
    created_at: Date;

    @UpdateDateColumn() // Added for updated_at
    updated_at: Date;

    @ManyToOne(() => Location)
    @JoinColumn({ name: "location_id" })
    location: Location;
}
