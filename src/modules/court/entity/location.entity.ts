import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CourtOwner } from "../../court-owner/entity/court-owner.entity";

@Entity()
export class Location {
    @PrimaryGeneratedColumn("uuid") // Changed to UUID
    id: string;

    @Column()
    owner_id: string;

    @Column()
    name: string;

    @Column({ type: "text" }) // Added for address
    address: string;

    @CreateDateColumn() // Added for created_at
    created_at: Date;

    @UpdateDateColumn() // Added for updated_at
    updated_at: Date;

    @ManyToOne(() => CourtOwner)
    @JoinColumn({ name: "owner_id" })
    owner: CourtOwner;
}
