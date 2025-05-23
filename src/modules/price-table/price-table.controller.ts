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
  Req,
  ForbiddenException,
} from '@nestjs/common';
import { PriceTableService } from './price-table.service';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'common/decorators/roles.decorator';
import { AuthGuard } from 'common/guards/auth.guard';
import { RolesGuard } from 'common/guards/roles.guard';
import { Request } from 'express';

@ApiTags('price-tables')
@Controller('price-tables')
export class PriceTableController {
  constructor(private readonly priceTableService: PriceTableService) {}

  // Price Table endpoints
  @Post()
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async createPriceTable(@Req() req: Request, @Body() data: CreatePriceTableDto) {
    if (req.user.role === 'owner' && req.user.id !== data.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to create price tables for other owners',
      );
    }
    return this.priceTableService.createPriceTable(data);
  }

  @Get()
  async findAllPriceTables(@Query('ownerId') ownerId?: string) {
    return this.priceTableService.findAllPriceTables(
      ownerId ? +ownerId : undefined,
    );
  }

  @Get(':id')
  async findPriceTableById(@Param('id') id: string) {
    return this.priceTableService.findPriceTableById(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async updatePriceTable(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() data: Partial<CreatePriceTableDto>,
  ) {
    const priceTable = await this.priceTableService.findPriceTableById(+id);
    
    if (req.user.role === 'owner' && req.user.id !== priceTable.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to update this price table',
      );
    }
    
    return this.priceTableService.updatePriceTable(+id, data);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles('admin', 'owner')
  @UseGuards(AuthGuard, RolesGuard)
  async deletePriceTable(@Req() req: Request, @Param('id') id: string) {
    const priceTable = await this.priceTableService.findPriceTableById(+id);
    
    if (req.user.role === 'owner' && req.user.id !== priceTable.owner_id) {
      throw new ForbiddenException(
        'You are not allowed to delete this price table',
      );
    }
    
    return this.priceTableService.deletePriceTable(+id);
  }
}