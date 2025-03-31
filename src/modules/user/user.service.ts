import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  createAdmin(data: CreateUserDto) {
    const newAdmin = this.userRepository.create({
      ...data,
      role: 'admin',
    });
    return this.userRepository.save(newAdmin);
  }

  createOwner(data: CreateUserDto) {
    const newOwner = this.userRepository.create({
      ...data,
      role: 'owner',
    });
    return this.userRepository.save(newOwner);
  }

  createCustomer(data: CreateUserDto) {
    const newUser = this.userRepository.create({
      ...data,
      role: 'customer',
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

  getUserInfo(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
      select: [
        'id',
        'name',
        'role',
        'phone',
        'updated_at',
        'created_at',
        'avatar_url',
        'email',
      ],
    });
  }

  async updateTokenVersion(userId: number): Promise<User> {
    const newTokenVersion = crypto.randomUUID();
    await this.userRepository.update(userId, {
      token_version: newTokenVersion,
    });
    const user = await this.userRepository.findOneBy({
      id: userId,
    });
    return user;
  }

  generateAccessToken(user: User): string {
    const payload = {
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.token_version,
    };

    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async comparePassword(password: string, hashedPassword: string) {
    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatched;
  }
}
