import { Comment } from '../comments/comment.entity';
import { Tag } from '../tags/tag.entity';
import { User } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    type: 'text',
  })
  reactions: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @ManyToMany(() => User, (user) => user.savedPosts)
  @JoinTable()
  usersWhoSaved: User[];
}
