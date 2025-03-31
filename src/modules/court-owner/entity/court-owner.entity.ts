import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "../../user/user.entity";

@Entity()
export class CourtOwner {
    @PrimaryGeneratedColumn() // Changed to UUID
    id: number;

    @Column()
    user_id: string;

    @Column()
    phone: string;

    @CreateDateColumn() // Added for created_at
    created_at: Date;

    @UpdateDateColumn() // Added for updated_at
    updated_at: Date;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user?: User;
}
