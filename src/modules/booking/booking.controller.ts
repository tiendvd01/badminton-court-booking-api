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
  BadRequestException,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Booking } from './entity/booking.entity';
import { CourtService } from '@modules/court/court.service';
import { Request } from 'express';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@ApiTags('bookings')
@Controller('bookings')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly courtService: CourtService,
  ) {}

  @Post()
  async createDraftBooking(@Body() data: CreateBookingDto) {
    return this.bookingService.createBooking(data);
  }

  @Post('/confirm')
  async customerConfirmBooking(@Body() data: { bookingId: number, paymentImageUrl: string }) {
    return this.bookingService.customerConfirmBooking(data.bookingId, data.paymentImageUrl);
  }

  @Get()
  async findAllBookings(
    @Query('customerName') customerName?: string,
    @Query('bookingDate') bookingDate?: string,
    @Query('status') status?: string[],
    @Query('locationId') locationId?: number,
  ) {
    return this.bookingService.findAllBookings({
      customerName,
      bookingDate,
      status,
      locationId,
    });
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
      const court = await this.courtService.findCourtById(+booking.slots[0].court_id);
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

  @Patch(':id/status')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update booking status' })
  @ApiBody({ type: UpdateBookingStatusDto })
  async updateBookingStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: UpdateBookingStatusDto,
  ) {
    const booking = await this.bookingService.findBookingById(+id);
    
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }

    if (req.user.role === 'owner') {
      const court = await this.courtService.findCourtById(+booking.slots[0].court_id);
      const location = await this.courtService.findLocationById(
        court.location_id,
      );

      if (location.owner_id !== req.user.id) {
        throw new ForbiddenException(
          'You are not allowed to update status for bookings of courts you do not own',
        );
      }
    }

    return this.bookingService.updateBookingStatus(+id, data.status);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteBooking(@Req() req: Request, @Param('id') id: string) {
    const booking = await this.bookingService.findBookingById(+id);

    if (req.user.role === 'owner') {
      const court = await this.courtService.findCourtById(+booking.slots[0].court_id);
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
