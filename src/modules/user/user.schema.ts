import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  bio: string;

  @Prop({
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: 'user' | 'admin';

  @Prop({
    default: 0,
  })
  tokenVersion: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
