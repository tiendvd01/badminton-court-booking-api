import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Booking } from './entity/booking.entity';
import { Payment } from './entity/payment.entity';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async createBooking(@Body() data: Partial<Booking>) {
    return this.bookingService.createBooking(data);
  }

  @Get()
  async findAllBookings() {
    return this.bookingService.findAllBookings();
  }

  @Get(':id')
  async findBookingById(@Param('id') id: string) {
    return this.bookingService.findBookingById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async updateBooking(
    @Param('id') id: string,
    @Body() data: Partial<Booking>,
  ) {
    return this.bookingService.updateBooking(+id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteBooking(@Param('id') id: string) {
    return this.bookingService.deleteBooking(+id);
  }

  // Payment endpoints
  @Post('payments')
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async createPayment(@Body() data: Partial<Payment>) {
    return this.bookingService.createPayment(data);
  }

  @Get('payments')
  async findAllPayments() {
    return this.bookingService.findAllPayments();
  }

  @Get('payments/:id')
  async findPaymentById(@Param('id') id: string) {
    return this.bookingService.findPaymentById(+id);
  }

  @Patch('payments/:id')
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async updatePayment(
    @Param('id') id: string,
    @Body() data: Partial<Payment>,
  ) {
    return this.bookingService.updatePayment(+id, data);
  }

  @Delete('payments/:id')
  @ApiBearerAuth()
  @Roles('admin', 'customer')
  @UseGuards(AuthGuard, RolesGuard)
  async deletePayment(@Param('id') id: string) {
    return this.bookingService.deletePayment(+id);
  }
}
