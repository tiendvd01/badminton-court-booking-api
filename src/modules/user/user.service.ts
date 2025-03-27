import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  createAdmin(data: CreateUserDto) {
    const newAdmin = this.userRepository.create({
      ...data,
      role: "admin",
    });
    return this.userRepository.save(newAdmin);
  }

  createOwner(data: CreateUserDto) {
    const newOwner = this.userRepository.create({
      ...data,
      role: "owner",
    });
    return this.userRepository.save(newOwner);
  }

  createCustomer(data: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...data,
      role: 'customer'
    });
    return this.userRepository.save(newUser);
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.token_version,
    };
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      issuer: 'badminton-booking',
    });
    return accessToken;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
  }
}
