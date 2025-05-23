import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceTable } from './entity/price-table.entity';
import { CreatePriceTableDto } from './dto/create-price-table.dto';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTable)
    private priceTableRepository: Repository<PriceTable>,
  ) {}

  // Price Table methods
  async createPriceTable(data: CreatePriceTableDto) {
    const priceTable = this.priceTableRepository.create(data);
    return this.priceTableRepository.save(priceTable);
  }

  async findAllPriceTables(ownerId?: number) {
    const where = ownerId ? { owner_id: ownerId } : {};
    return this.priceTableRepository.find({
      where,
      relations: ['owner'],
    });
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