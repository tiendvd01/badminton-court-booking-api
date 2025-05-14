import { IsEmail, IsString, IsOptional, MinLength } from 'class-validator';

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
    address?: string;

    @IsString()
    @IsOptional()
    avatar_url?: string;
}