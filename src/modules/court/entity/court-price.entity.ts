import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from './court.entity';

@Entity('court_prices')
export class CourtPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  court_id: number;

  @Column()
  start_time: string; // Format: "HH:mm"

  @Column()
  end_time: string; // Format: "HH:mm"

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Court, (court) => court.prices)
  court: Court;
} 