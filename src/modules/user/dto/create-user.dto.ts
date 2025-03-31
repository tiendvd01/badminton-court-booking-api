import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateUserDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsString()
    @IsOptional()
    avatar_url?: string;
}