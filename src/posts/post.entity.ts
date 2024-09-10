import { User } from '../users/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cover_image: string;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'longtext',
  })
  body: string;

  @Column({
    length: 2000,
  })
  slug: string;

  @Column({
    type: "text"
  })
  reactions: string;

  @ManyToOne((type) => User, (user) => user.posts)
  user: User;
}
