import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';

export class Slot {
    @ApiProperty({ description: 'ID of the court', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    courtId: number;

    @ApiProperty({ description: 'Start time in HH:mm format', example: '09:00' })
    @IsString()
    @IsNotEmpty()
    startTime: string;

    @ApiProperty({ description: 'End time in HH:mm format', example: '10:00' })
    @IsString()
    @IsNotEmpty()
    endTime: string;
}

export class CustomerInfoDto {
    @ApiProperty({ description: 'Customer name', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Customer phone number', example: '0987654321' })
    @IsString()
    @IsNotEmpty()
    phone_number: string;
}

export class CreateBookingDto {
    @ApiProperty({ 
        description: 'Array of time slots to book',
        type: [Slot],
        example: [
            { courtId: 1, startTime: '09:00', endTime: '10:00' },
            { courtId: 2, startTime: '10:00', endTime: '11:00' }
        ]
    })
    @IsArray()
    @ValidateNested({ each: true })
    slots: Slot[];

    @ApiProperty({ description: 'ID of the location', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    locationId: number;

    @ApiProperty({ 
        description: 'Customer information',
        type: CustomerInfoDto
    })
    @IsObject()
    @ValidateNested()
    customer_info: CustomerInfoDto;

    @ApiProperty({ description: 'Booking date', example: '2023-01-01' })
    @IsString()
    @IsNotEmpty()
    booking_date: string;

    @ApiProperty({ description: 'Note', example: 'Note' })
    @IsString()
    @IsOptional()
    note?: string;
}