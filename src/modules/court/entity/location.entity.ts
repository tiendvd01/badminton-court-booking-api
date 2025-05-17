import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from './court.entity';
import { User } from '@modules/user/entity/user.entity'; 
@Entity('locations')
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    owner_id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: "owner_id" })
    owner: User;

    @OneToMany(() => Court, (court) => court.location)
    courts: Court[];
}
