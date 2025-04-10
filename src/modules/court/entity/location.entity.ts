import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from './court.entity';

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

    @Column({ nullable: true })
    image_url?: string;

    @OneToMany(() => Court, (court) => court.location)
    courts: Court[];
}
