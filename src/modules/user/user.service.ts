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

  // Read methods
  findUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  findUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
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
    await this.userRepository.update(userId, {
      token_version: newTokenVersion,
    });
    return this.userRepository.findOneBy({ id: userId });
  }

  generateAccessToken(user: User): string {
    const payload = {
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
}
