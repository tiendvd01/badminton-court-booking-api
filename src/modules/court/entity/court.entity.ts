import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './location.entity';
import { PriceTable } from '@modules/price-table/entity/price-table.entity';

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

  @Column()
  price_id: number;

  @ManyToOne(() => PriceTable, priceTable => priceTable.courts)
  @JoinColumn({ name: 'price_id' })
  priceTable: PriceTable;
}
