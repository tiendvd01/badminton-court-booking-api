
import { User } from '@modules/user/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Court } from '@modules/court/entity/court.entity';

export interface Price {
  start_time: string;
  end_time: string;
  price: number;
}

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

  @Column({
    type: "json",
    nullable: true,
  })
  prices: Price[];

  @OneToMany(() => Court, court => court.priceTable)
  courts: Court[];
}

