import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Post } from "../post/post.schema";

@Schema()
export class Comment {
    @Prop()
    content: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    })
    post: Post;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);