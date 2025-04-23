import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from './court.entity';

@Entity('court_prices')
export class CourtPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  court_id: number;

  @Column()
  start_time: string; 

  @Column()
  end_time: string; 

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(type => Court)
  @JoinColumn({ name: "court_id" })
  court: Court;
} 