import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { BookingStatus } from '../entity/booking.entity';

export class UpdateBookingStatusDto {
  @ApiProperty({
    description: 'Booking status',
    enum: BookingStatus,
    example: BookingStatus.CONFIRMED,
  })
  @IsNotEmpty()
  @IsEnum(BookingStatus)
  status: BookingStatus;
}