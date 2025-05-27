import { IsString, IsOptional, IsUrl, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ description: 'Location name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Location address' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'Location description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Minimum shift time (in minutes)' })
  @IsNumber()
  min_shift_time: number;

  @ApiProperty({ description: 'Location owner ID' })
  @IsNumber()
  owner_id: number;
} 