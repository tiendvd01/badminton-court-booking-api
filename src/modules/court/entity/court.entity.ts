import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';
import { CourtPrice } from './court-price.entity';

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location_id: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image_url?: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(type => Location)
  @JoinColumn({ name: "location_id" })
  location: Location;

  @OneToMany(() => CourtPrice, (price) => price.court)
  prices: CourtPrice[];
}
