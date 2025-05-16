import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { UserRole } from 'enums/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Create methods
  async createAdmin(data: CreateUserDto) {
    const hashedPassword = await this.hashPassword(data.password);
    const newAdmin = this.userRepository.create({
      ...data,
      role: 'admin',
      password: hashedPassword,
    });
    return this.userRepository.save(newAdmin);
  }

  async createOwner(data: CreateUserDto) {
    const hashedPassword = await this.hashPassword(data.password);
    const newOwner = this.userRepository.create({
      ...data,
      role: 'owner',
      password: hashedPassword,
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

  // Read methods
  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'phone', 'role', 'avatar_url', 'created_at', 'updated_at', 'token_version'],
      cache: false, // Disable caching for this query
    });
  }

  findAllUsers(role?: UserRole) {
    return this.userRepository.find({
      where: role ? { role: role } : {},
      select: ['id', 'name', 'email', 'phone', 'role', 'avatar_url', 'created_at', 'updated_at'],
    });
  }

  // Update methods
  async updateUser(id: number, data: UpdateUserDto) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.userRepository.save({
      id: user.id,
      ...data,
    });
  }

  // Delete methods
  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.delete(id);
    return { message: 'User deleted successfully' };
  }

  // Auth methods
  async updateTokenVersion(userId: number): Promise<User> {
    const newTokenVersion = crypto.randomUUID();
    
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.token_version = newTokenVersion;

    await this.userRepository.save(user);

    return user;
  }

  generateAccessToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      tokenVersion: user.token_version,
    };
    return this.jwtService.sign(payload);
  }

  async comparePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
