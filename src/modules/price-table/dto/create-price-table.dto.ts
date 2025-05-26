import { IsString, IsNumber, IsOptional, IsObject, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PriceDto {
  @ApiProperty({ description: 'Start time of price period' })
  @IsString()
  start_time: string;

  @ApiProperty({ description: 'End time of price period' })
  @IsString()
  end_time: string;

  @ApiProperty({ description: 'Price amount' })
  @IsNumber()
  price: number;
}

export class CreatePriceTableDto {
  @ApiProperty({ description: 'Price table name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Price table description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Price table prices', type: [PriceDto] })
  @IsOptional()
  @IsArray()
  prices?: PriceDto[];

  @ApiProperty({ description: 'Owner ID' })
  @IsNumber()
  @IsOptional()
  owner_id?: number;
}