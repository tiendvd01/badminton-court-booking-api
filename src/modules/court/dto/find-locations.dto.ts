import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindLocationsDto {
  @ApiPropertyOptional({ description: 'Filter by province' })
  @IsString()
  @IsOptional()
  province?: string;

  @ApiPropertyOptional({ description: 'Filter by district' })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiPropertyOptional({ description: 'Search by location name' })
  @IsString()
  @IsOptional()
  search?: string;
}
