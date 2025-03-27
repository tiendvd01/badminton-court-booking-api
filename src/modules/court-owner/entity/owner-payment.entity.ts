import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CourtOwner } from "./court-owner.entity";

@Entity()
export class OwnerPaymentInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_name: string;

    @Column()
    payment_number: string;

    @Column()
    bank_name: string;

    @Column()
    owner_id: string;

    @ManyToOne(() => CourtOwner)
    @JoinColumn({ name: "owner_id" })
    Owner: CourtOwner;
}
