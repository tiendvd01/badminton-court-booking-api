import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { UserRole } from 'enums/user-role.enum';

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

  @Post('/login')
  async login(@Body() loginUserDto: LoginDto) {
    const existingUser = await this.userService.findUserByEmail(
      loginUserDto.email,
    );
    if (!existingUser) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordMatched = await this.userService.comparePassword(
      loginUserDto.password,
      existingUser.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid email or password');
    }

    const updatedUser = await this.userService.updateTokenVersion(existingUser.id);
    const accessToken = this.userService.generateAccessToken(updatedUser);
    return {
      message: 'Login successful',
      accessToken,
    };
  }

  @Post('/createAdmin')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already existed');
    }

    await this.userService.createAdmin(createUserDto);
    return {
      message: 'Admin created successfully',
    };
  }

  @Post('/createOwner')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async createOwner(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findUserByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('Email already existed');
    }

    await this.userService.createOwner(createUserDto);
    return {
      message: 'Owner created successfully',
    };
  }

  @Get()
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async findAll(@Query('role') role?: UserRole) {
    return this.userService.findAllUsers(role);
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }
}
