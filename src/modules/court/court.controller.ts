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
  BadRequestException,
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateCourtDto } from './dto/create-court.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiQuery
} from '@nestjs/swagger';
import { FindLocationsDto } from './dto/find-locations.dto';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Request } from 'express';

@ApiTags('locations')
@Controller('locations')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  // Location endpoints
  @Post('/')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createLocation(@Req() req: Request, @Body() data: CreateLocationDto) {
    if (req.user.role == 'owner' && req.user.id != data.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to create location for this owner',
      );
    }
    return this.courtService.createLocation(data);
  }

  @Get('/')
  @ApiQuery({ name: 'province', required: false, type: String })
  @ApiQuery({ name: 'district', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  async findAllLocations(@Query() filters: FindLocationsDto) {
    return this.courtService.findAllLocations({
      province: filters?.province,
      district: filters?.district,
      search: filters?.search,
    });
  }

  @Get('/:id')
  async findLocationById(@Param('id') id: string) {
    return this.courtService.findLocationById(+id);
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updateLocation(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: Partial<CreateLocationDto>,
  ) {
    const location = await this.courtService.findLocationById(+id);
    if (req.user.role == 'owner' && req.user.id != location.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to update this location',
      );
    }
    return this.courtService.updateLocation(+id, data);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteLocation(@Req() req: Request, @Param('id') id: string) {
    const location = await this.courtService.findLocationById(+id);
    if (req.user.role == 'owner' && req.user.id != location.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to create location for this owner',
      );
    }
    return this.courtService.deleteLocation(+id);
  }

  // Court endpoints
  @Post('courts')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createCourt(@Req() req: Request, @Body() data: CreateCourtDto) {
    const location = await this.courtService.findLocationById(data.location_id);

    if (!location) {
      throw new BadRequestException('Location not found');
    }

    if (req.user.role == 'owner' && req.user.id != location.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to create court for this location',
      );
    }

    return this.courtService.createCourt(data);
  }

  @Get('/:id/courts')
  async findAllCourts(@Param('id') locationId?: string) {
    return this.courtService.findAllCourts(
      locationId ? +locationId : undefined,
    );
  }

  @Get('/courts/:id')
  async findCourtById(@Param('id') id: string) {
    return this.courtService.findCourtById(+id);
  }

  @Patch('/courts/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updateCourt(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: Partial<CreateCourtDto>,
  ) {
    const court = await this.courtService.findCourtById(+id);
    const location = await this.courtService.findLocationById(court.location_id);

    if (!location) {
      throw new BadRequestException('Location not found');
    }

    if (req.user.role == 'owner' && req.user.id != location.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to update court for this location',
      );
    }

    return this.courtService.updateCourt(+id, data);
  }

  @Delete('/courts/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteCourt(@Req() req: Request, @Param('id') id: string) {
    const court = await this.courtService.findCourtById(+id);
    const location = await this.courtService.findLocationById(+court.location_id);

    if (!location) {
      throw new BadRequestException('Location not found');
    }

    if (req.user.role == 'owner' && req.user.id != location.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to update court for this location',
      );
    }
    return this.courtService.deleteCourt(+id);
  }

  @Post('/:id/images/add')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async addLocationImages(
    @Param('id') id: string,
    @Body() data: { imageUrls: string[] },
  ) {
    if (!data.imageUrls || data.imageUrls.length === 0) {
      throw new BadRequestException('No images uploaded');
    }
    return this.courtService.addManyLocationImages(+id, data.imageUrls);
  }

  @Get('/:id/images')
  async getLocationImages(@Param('id') id: string) {
    return this.courtService.getLocationImages(+id);
  }

  @Delete('/images/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteLocationImage(@Param('id') id: string) {
    return this.courtService.deleteLocationImage(+id);
  }
}
