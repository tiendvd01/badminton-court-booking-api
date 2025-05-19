import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePriceTableDto {
  @ApiPropertyOptional({ description: 'Price table description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Owner ID' })
  @IsNumber()
  owner_id: number;
}