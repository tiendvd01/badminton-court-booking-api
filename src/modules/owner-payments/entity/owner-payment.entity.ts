import { User } from '@modules/user/entity/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';

export interface BankInfo {
  id: string;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string;
}

@Entity('owner_payments')
@Unique(['bank_code', 'payment_number'])
export class OwnerPayment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_name: string;

  @Column()
  payment_number: string;

  @Column({ type: 'json', nullable: true })
  bank_info: BankInfo;

  @Column()
  bank_code: string;

  @Column()
  qr_image: string;

  @Column()
  owner_id: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;
}
