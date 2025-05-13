import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { UserRole } from 'enums/user-role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
    const { password, ...userWithoutPassword } = updatedUser;
    return {
      message: 'Login successful',
      token: accessToken,
      user: userWithoutPassword,
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

  @Patch('/:id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async updateAdmin(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findUserById(+id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Patch('/profile/edit')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Request() req
  ) {
    const user = await this.userService.findUserById(+req.user.id);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (req.user.email !== user.email) {
      throw new ForbiddenException('Owners can only update their own profile');
    }

    const result = await this.userService.updateUser(+req.user.id, updateUserDto);
    
    return result;
  }

  @Get('/profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getProfile(@Request() req) {
    const userId = req.user.id;
    const user = await this.userService.findUserById(userId);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
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

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }

  @Post('upload-avatar')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Upload user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Avatar uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const avatarUrl = file.path;
      
      // Update user's avatar_url
      await this.userService.updateUser(req.user.id, { avatar_url: avatarUrl });
      
      return {
        message: 'Avatar uploaded successfully',
        avatar_url: avatarUrl,
      };
    } catch (error) {
      throw new BadRequestException(`Failed to upload avatar: ${error.message}`);
    }
  }
}
