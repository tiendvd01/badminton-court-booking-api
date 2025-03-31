import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already existed');
    }
    await this.userService.createCustomer(createUserDto);
    return {
      message: 'User created successfully',
    };
  }

  @Post('/createAdmin')
  async registerAdmin(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already existed');
    }

    await this.userService.createAdmin(createUserDto);
    return {
      message: 'User create successfully',
    };
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginDto) {
    const existingUser = await this.userService.findUserByEmail(
      loginUserDto.email,
    );
    if (!existingUser) {
      return {
        message: 'Invalid email or password',
      };
    }

    const isPasswordMatched = await this.userService.comparePassword(
      loginUserDto.password,
      existingUser.password,
    );
    if (!isPasswordMatched) {
      return {
        message: 'Invalid email or password',
      };
    }

    const accessToken = this.userService.generateAccessToken(existingUser);
    return {
      message: 'Login successful',
      accessToken,
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.CREATED)
  async getUserInfo() {
    const userInfo = await this.getUserInfo()
  }
}
