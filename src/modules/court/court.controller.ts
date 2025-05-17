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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UploadedFiles,
} from '@nestjs/common';
import { CourtService } from './court.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateCourtDto } from './dto/create-court.dto';
import { CreateCourtPriceDto } from './dto/create-court-price.dto';
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { ImageFileInterceptor } from 'common/interceptors/ImageFileInterceptor';

@ApiTags('courts')
@Controller('courts')
export class CourtController {
  constructor(private readonly courtService: CourtService) {}

  // Location endpoints
  @Post('locations')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createLocation(@Body() data: CreateLocationDto) {
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
    @Param('id') id: string,
    @Body() data: Partial<CreateLocationDto>,
  ) {
    return this.courtService.updateLocation(+id, data);
  }

  @Delete('locations/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteLocation(@Param('id') id: string) {
    return this.courtService.deleteLocation(+id);
  }

  // Court endpoints
  @Post()
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createCourt(@Body() data: CreateCourtDto) {
    return this.courtService.createCourt(data);
  }

  @Get()
  async findAllCourts(@Query('locationId') locationId?: string) {
    return this.courtService.findAllCourts(locationId ? +locationId : undefined);
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
    @Param('id') id: string,
    @Body() data: Partial<CreateCourtDto>,
  ) {
    return this.courtService.updateCourt(+id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteCourt(@Param('id') id: string) {
    return this.courtService.deleteCourt(+id);
  }

  @Post('prices')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createCourtPrice(@Body() data: CreateCourtPriceDto) {
    return this.courtService.createCourtPrice(data);
  }

  @Get('prices')
  async findAllCourtPrices(@Query('courtId') courtId?: string) {
    return this.courtService.findAllCourtPrices(
      courtId ? +courtId : undefined,
    );
  }

  @Get('prices/:id')
  async findCourtPriceById(@Param('id') id: string) {
    return this.courtService.findCourtPriceById(+id);
  }

  @Patch('prices/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updateCourtPrice(
    @Param('id') id: string,
    @Body() data: Partial<CreateCourtPriceDto>,
  ) {
    return this.courtService.updateCourtPrice(+id, data);
  }

  @Delete('prices/:id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deleteCourtPrice(@Param('id') id: string) {
    return this.courtService.deleteCourtPrice(+id);
  }

  @Post('locations/:id/images/add')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async addLocationImages(
    @Param('location_id') location_id: string,
    @Body() imageUrls: string[]
  ) {
    if (!imageUrls || imageUrls.length === 0) {
      throw new BadRequestException('No images uploaded');
    }
    return this.courtService.addManyLocationImages(+location_id, imageUrls);
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
