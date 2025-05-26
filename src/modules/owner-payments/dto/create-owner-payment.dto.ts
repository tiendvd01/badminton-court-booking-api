import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { BankInfo } from '../entity/owner-payment.entity';

export class CreateOwnerPaymentDto {
  @ApiProperty({ description: 'Account name' })
  @IsString()
  @IsNotEmpty()
  account_name: string;

  @ApiProperty({ description: 'Payment number (account number)' })
  @IsString()
  @IsNotEmpty()
  payment_number: string;

  @ApiProperty({ description: 'Bank code' })
  @IsString()
  @IsNotEmpty()
  bank_code: string;

  @ApiProperty({ description: 'Bank information', type: 'object' })
  bank_info: BankInfo;

  @ApiProperty({ description: 'QR code image URL' })
  @IsString()
  @IsNotEmpty()
  qr_image: string;

  @ApiPropertyOptional({ description: 'Owner ID' })
  @IsString()
  @IsOptional()
  owner_id?: string;

  @ApiPropertyOptional({ description: 'Active status', default: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}