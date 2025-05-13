import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({ description: 'User full name' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiPropertyOptional({ description: 'User email address' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ description: 'User phone number' })
    @IsString()
    @IsOptional()
    phone?: string;

    @ApiPropertyOptional({ description: 'URL to user avatar image' })
    @IsString()
    @IsOptional()
    avatar_url?: string;
} 