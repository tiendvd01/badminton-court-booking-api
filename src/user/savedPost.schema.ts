import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../user/user.schema';
import { Post } from '../post/post.schema';

@Schema()
export class SavedPost {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  }) 
  post: Post;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;
}

export const SavedPostSchema = SchemaFactory.createForClass(SavedPost);
