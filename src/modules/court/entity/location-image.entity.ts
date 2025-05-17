
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';

@Entity('location_images')
export class LocationImage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    location_id: number;

    @Column({ type: 'text' })
    image_url: string;

    @ManyToOne(type => Location)
    @JoinColumn({ name: "location_id" })
    location: Location;
}

