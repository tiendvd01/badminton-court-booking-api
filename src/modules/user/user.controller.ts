import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';

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
    const updatedUser = await this.userService.updateTokenVersion(existingUser.id);
    const accessToken = this.userService.generateAccessToken(updatedUser);
    return {
      message: 'Login successful',
      accessToken,
    };
  }

  @Get('/')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getUserInfo() {
    const userInfo = await this.getUserInfo()
    return 'tienchillchill';
  }
}
