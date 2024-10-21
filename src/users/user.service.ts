import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RegisterUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePasswords(newPassword: string, passwordHash: string) {
    return bcrypt.compare(newPassword, passwordHash);
  }

  generateToken(user: User) {
    const accessToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET || '',
      {
        expiresIn: '30d',
      },
    );
    return accessToken;
  }

  async register(user: RegisterUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    user.password = await this.hashPassword(user.password);
    const createdUser = await this.userRepository.save(user);
    const accessToken = this.generateToken(createdUser);
    return {
      accessToken,
      user
    };
  }

  async login(userName: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: userName,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const isMatched = await this.comparePasswords(password, user.password);
    if (!isMatched) {
      throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const accessToken = this.generateToken(user);

    return {
      accessToken,
    };
  }
}
