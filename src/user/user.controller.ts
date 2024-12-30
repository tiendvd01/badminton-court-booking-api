import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res) {
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

  @Post("login")
  async login() {
    
  }

}
