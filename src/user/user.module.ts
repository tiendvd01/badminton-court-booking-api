import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SavedPost, SavedPostSchema } from './savedPost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: SavedPost.name, schema: SavedPostSchema },
    ]),
  ],
})
export class UserModule {}
