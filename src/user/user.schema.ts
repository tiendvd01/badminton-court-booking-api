import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

    @Prop()
    email: string;

    @Prop()
    avatarUrl: string;

    @Prop()
    bio: string;

    @Prop({
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: 'user' | 'admin';
}

export const UserSchema = SchemaFactory.createForClass(User);