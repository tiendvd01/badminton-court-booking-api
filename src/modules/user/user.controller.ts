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

@ApiTags("users")
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
    await this.userService.createUser(createUserDto);
    return {
      message: 'User created successfully',
    };
  }

  @Post("/login")
  async login(@Body() loginUserDto: LoginDto) {
    const existingUser = await this.userService.findUserByEmail(loginUserDto.email);
    if (!existingUser) {
      return {
        message: "User not found",
      }
    }
    return {
      message: ""
    }
  }

  @Get('/')
  @HttpCode(HttpStatus.CREATED)
  async getUser() {
    // throw new BadRequestException("User not found")
    return {
      username: "User 1234",
      password: '1234'
    }
  }
}
