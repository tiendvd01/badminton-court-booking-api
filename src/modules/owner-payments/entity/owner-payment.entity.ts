import { User } from "@modules/user/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity("owner_payment_info")
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

    @ManyToOne(() => User)
    @JoinColumn({ name: "owner_id" })
    owner: User;
}
