import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SavedPost, SavedPostSchema } from './savedPost.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function () {
            bcrypt.hash(this.password, 10, (err, hash) => {
              this.password = hash;
            });
          });
          return UserSchema;
        },
      },
      {
        name: SavedPost.name,
        useFactory: () => {
          return SavedPostSchema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
