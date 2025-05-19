
import { User } from '@modules/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';
import { Court } from '@modules/court/entity/court.entity';

@Entity('price_tables')
export class PriceTable {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  owner_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @OneToMany(() => Price, price => price.priceTable)
  prices: Price[];

  @ManyToOne(() => Court)
  @JoinColumn({ name: 'court_id' })
  courts: Court[];
}

