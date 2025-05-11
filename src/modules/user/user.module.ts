import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'configs/cloudinary';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
