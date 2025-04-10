import { IsString, IsNumber, IsOptional, IsUrl, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourtDto {
  @ApiProperty({ description: 'Court name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Location ID' })
  @IsNumber()
  location_id: number;

  @ApiPropertyOptional({ description: 'Court description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'URL to court image' })
  @IsUrl()
  @IsOptional()
  image_url?: string;

  @ApiPropertyOptional({ description: 'Court active status', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
} 