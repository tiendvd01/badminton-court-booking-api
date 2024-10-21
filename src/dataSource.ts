import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';
import { Tag } from './tags/tag.entity';
import { Comment } from './comments/comment.entity';
dotenv.config();

export default new DataSource({
  url: process.env.DATABASE_URL,
  type: 'mysql',
  migrationsTableName: '_migrations',
  migrations: ['dist/database/migrations/*.js'],
  entities: [User, Post, Tag, Comment],
});
