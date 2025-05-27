import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Booking } from './entity/booking.entity';
import { CourtService } from '@modules/court/court.service';
import { Request } from 'express';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly courtService: CourtService,
  ) {}

  @Post()
  @ApiBearerAuth()
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
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updateBooking(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: Partial<Booking>,
  ) {
    const booking = await this.bookingService.findBookingById(+id);

    if (req.user.role === 'owner') {
      const court = await this.courtService.findCourtById(+booking.court_id);
      const location = await this.courtService.findLocationById(
        court.location_id,
      );

      if (location.owner_id !== req.user.id) {
        throw new ForbiddenException(
          'You are not allowed to update bookings for courts you do not own',
        );
      }
    }

    return this.bookingService.updateBooking(+id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteBooking(@Req() req: Request, @Param('id') id: string) {
    const booking = await this.bookingService.findBookingById(+id);

    if (req.user.role === 'owner') {
      const court = await this.courtService.findCourtById(+booking.court_id);
      const location = await this.courtService.findLocationById(
        court.location_id,
      );

      if (location.owner_id !== req.user.id) {
        throw new ForbiddenException(
          'You are not allowed to delete bookings for courts you do not own',
        );
      }
    }

    return this.bookingService.deleteBooking(+id);
  }
}
