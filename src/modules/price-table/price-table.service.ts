import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceTable } from './entity/price-table.entity';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { Location } from '@modules/court/entity/location.entity';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTable)
    private priceTableRepository: Repository<PriceTable>,
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  // Price Table methods
  async createPriceTable(data: CreatePriceTableDto) {
    const priceTable = this.priceTableRepository.create(data);
    return this.priceTableRepository.save(priceTable);
  }

  async findAllPriceTables(ownerId?: number, locationId?: number) {
    const where = ownerId ? { owner_id: ownerId } : {};
    return this.priceTableRepository.find({
      where,
      relations: ['owner'],
    });
  }

  async findAllPriceTablesByLocation(locationId: number) {
    const location = await this.locationRepository.findOne({
      where: { id: locationId },
      relations: ['courts.priceTable'],
    });

    if (!location) {
      throw new NotFoundException('Location not found');
    }

    // Sử dụng Map để loại bỏ các priceTable trùng lặp dựa trên id
    const uniquePriceTables = new Map<number, any>();

    location.courts.forEach((court) => {
      if (court.priceTable) {
        uniquePriceTables.set(court.priceTable.id, court.priceTable);
      }
    });

    // Chuyển Map thành mảng các priceTable
    return Array.from(uniquePriceTables.values());
  }

  async findPriceTableById(id: number) {
    const priceTable = await this.priceTableRepository.findOne({
      where: { id },
      relations: ['owner'],
    });

    if (!priceTable) {
      throw new NotFoundException('Price table not found');
    }

    return priceTable;
  }

  async updatePriceTable(id: number, data: Partial<CreatePriceTableDto>) {
    await this.findPriceTableById(id);
    await this.priceTableRepository.update(id, data);
    return this.findPriceTableById(id);
  }

  async deletePriceTable(id: number) {
    await this.findPriceTableById(id);
    await this.priceTableRepository.delete(id);
    return { message: 'Price table deleted successfully' };
  }
}
