import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourtPriceDto {
  @ApiProperty({ description: 'Court ID' })
  @IsNumber()
  court_id: number;

  @ApiProperty({ description: 'Start time (HH:mm)' })
  @IsString()
  start_time: string;

  @ApiProperty({ description: 'End time (HH:mm)' })
  @IsString()
  end_time: string;

  @ApiProperty({ description: 'Price for this time slot' })
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ description: 'Price active status', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
} 