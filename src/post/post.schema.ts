import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';

@Schema()
export class Post {
  @Prop()
  cover_image_url: string;

  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({
    unique: true,
  })
  slug: string;

  @Prop(
    raw({
      like: { type: Number, default: 0 },
      unicorn: { type: Number, default: 0 },
      exploding_head: { type: Number, default: 0 },
      raise_hand: { type: Number, default: 0 },
      fire: { type: Number, default: 0 },
    }),
  )
  reactions: {
    like: number;
    unicorn: number;
    exploding_head: number;
    raise_hand: number;
    fire: number;
  };

  @Prop()
  tags: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
