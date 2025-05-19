import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePriceDto {
  @ApiProperty({ description: 'Start time (HH:mm)' })
  @IsString()
  start_time: string;

  @ApiProperty({ description: 'End time (HH:mm)' })
  @IsString()
  end_time: string;

  @ApiProperty({ description: 'Price amount' })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Price table ID' })
  @IsNumber()
  price_table_id: number;
}