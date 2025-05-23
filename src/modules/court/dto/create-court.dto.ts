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

  @ApiPropertyOptional({ description: 'Court active status', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ description: 'Price table ID apply for this court' })
  @IsNumber()
  @IsOptional()
  price_table_id?: number;
} 