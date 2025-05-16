import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'enums/user-role.enum';

@Entity({
  name: "users"
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'owner', 'customer'],
    default: 'customer',
  })
  role: UserRole;

  @Column({ nullable: true })
  avatar_url?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ default: 0 })
  token_version: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
