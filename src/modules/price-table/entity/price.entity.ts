import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PriceTable } from './price-table.entity';

@Entity('prices')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  price_table_id: number;

  @ManyToOne(() => PriceTable, priceTable => priceTable.prices)
  @JoinColumn({ name: 'price_table_id' })
  priceTable: PriceTable;
}
