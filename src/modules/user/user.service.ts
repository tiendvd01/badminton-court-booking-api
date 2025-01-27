import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(data: CreateUserDto) {
    const newUser = new this.userModel({
      ...data,
      role: 'user',
    });
    return newUser.save();
  }

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
