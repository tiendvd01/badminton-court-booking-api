import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

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

  generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      issuer: "community-blog-api",
    });
    return accessToken;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
  }
}
