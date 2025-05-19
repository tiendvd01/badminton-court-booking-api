import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PriceTable } from './entity/price-table.entity';
import { Price } from './entity/price.entity';
import { CreatePriceTableDto } from './dto/create-price-table.dto';
import { CreatePriceDto } from './dto/create-price.dto';

@Injectable()
export class PriceTableService {
  constructor(
    @InjectRepository(PriceTable)
    private priceTableRepository: Repository<PriceTable>,
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
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
      relations: ['owner', 'prices'],
    });
  }

  async findPriceTableById(id: number) {
    const priceTable = await this.priceTableRepository.findOne({
      where: { id },
      relations: ['owner', 'prices'],
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

  // Price methods
  async createPrice(data: CreatePriceDto) {
    const priceTable = await this.findPriceTableById(data.price_table_id);
    const price = this.priceRepository.create({
      ...data,
      priceTable,
    });
    return this.priceRepository.save(price);
  }

  async findAllPrices(priceTableId?: number) {
    const where = priceTableId ? { price_table_id: priceTableId } : {};
    return this.priceRepository.find({
      where,
      relations: ['priceTable'],
    });
  }

  async findPriceById(id: number) {
    const price = await this.priceRepository.findOne({
      where: { id },
      relations: ['priceTable'],
    });
    
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    
    return price;
  }

  async updatePrice(id: number, data: Partial<CreatePriceDto>) {
    await this.findPriceById(id);
    if (data.price_table_id) {
      await this.findPriceTableById(data.price_table_id);
    }
    await this.priceRepository.update(id, data);
    return this.findPriceById(id);
  }

  async deletePrice(id: number) {
    await this.findPriceById(id);
    await this.priceRepository.delete(id);
    return { message: 'Price deleted successfully' };
  }
}