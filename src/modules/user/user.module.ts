import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'configs/cloudinary';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
