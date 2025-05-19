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
  ApiConsumes,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Request } from 'express';

@ApiTags('courts')
@Controller('courts')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  // Location endpoints
  @Post('locations')
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

  @Get('locations')
  async findAllLocations() {
    return this.courtService.findAllLocations();
  }

  @Get('locations/:id')
  async findLocationById(@Param('id') id: string) {
    return this.courtService.findLocationById(+id);
  }

  @Patch('locations/:id')
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

  @Delete('locations/:id')
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
  @Post()
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

  @Get()
  async findAllCourts(@Query('locationId') locationId?: string) {
    return this.courtService.findAllCourts(
      locationId ? +locationId : undefined,
    );
  }

  @Get(':id')
  async findCourtById(@Param('id') id: string) {
    return this.courtService.findCourtById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updateCourt(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: Partial<Omit<CreateCourtDto, 'location_id'>>,
  ) {
    const location = await this.courtService.findLocationById(+id);

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

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteCourt(@Req() req: Request, @Param('id') id: string) {
    const location = await this.courtService.findLocationById(+id);

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

  @Post('locations/:id/images/add')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async addLocationImages(
    @Param('id') id: string,
    @Body() imageUrls: string[],
  ) {
    if (!imageUrls || imageUrls.length === 0) {
      throw new BadRequestException('No images uploaded');
    }
    return this.courtService.addManyLocationImages(+id, imageUrls);
  }

  @Get('locations/:id/images')
  async getLocationImages(@Param('id') id: string) {
    return this.courtService.getLocationImages(+id);
  }

  @Delete('locations/images/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteLocationImage(@Param('id') id: string) {
    return this.courtService.deleteLocationImage(+id);
  }
}
