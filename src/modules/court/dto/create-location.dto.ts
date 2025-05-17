import { IsString, IsOptional, IsUrl } from 'class-validator';
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
} 