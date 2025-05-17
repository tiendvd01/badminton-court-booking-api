import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { Court } from './entity/court.entity';
import { CourtPrice } from './entity/court-price.entity';
import { LocationImage } from './entity/location-image.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateCourtDto } from './dto/create-court.dto';
import { CreateCourtPriceDto } from './dto/create-court-price.dto';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
    @InjectRepository(CourtPrice)
    private courtPriceRepository: Repository<CourtPrice>,
    @InjectRepository(LocationImage)
    private locationImageRepository: Repository<LocationImage>,
  ) {}

  async createLocation(data: CreateLocationDto) {
    const location = this.locationRepository.create(data);
    return this.locationRepository.save(location);
  }

  async findAllLocations() {
    return this.locationRepository.find({
      relations: ['courts'],
    });
  }

  async findLocationById(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['courts'],
    });
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  async updateLocation(id: number, data: Partial<CreateLocationDto>) {
    await this.findLocationById(id);
    await this.locationRepository.update(id, data);
    return this.findLocationById(id);
  }

  async deleteLocation(id: number) {
    await this.findLocationById(id);
    await this.locationRepository.delete(id);
    return { message: 'Location deleted successfully' };
  }

  async createCourt(data: CreateCourtDto) {
    const location = await this.findLocationById(data.location_id);
    const court = this.courtRepository.create({
      ...data,
      location,
    });
    return this.courtRepository.save(court);
  }

  async findAllCourts(locationId?: number) {
    const where = locationId ? { location_id: locationId } : {};
    return this.courtRepository.find({
      where,
      relations: ['location', 'prices'],
    });
  }

  async findCourtById(id: number) {
    const court = await this.courtRepository.findOne({
      where: { id },
      relations: ['location', 'prices'],
    });
    if (!court) {
      throw new NotFoundException('Court not found');
    }
    return court;
  }

  async updateCourt(id: number, data: Partial<CreateCourtDto>) {
    await this.findCourtById(id);
    if (data.location_id) {
      await this.findLocationById(data.location_id);
    }
    await this.courtRepository.update(id, data);
    return this.findCourtById(id);
  }

  async deleteCourt(id: number) {
    await this.findCourtById(id);
    await this.courtRepository.delete(id);
    return { message: 'Court deleted successfully' };
  }

  async createCourtPrice(data: CreateCourtPriceDto) {
    const court = await this.findCourtById(data.court_id);
    const price = this.courtPriceRepository.create({
      ...data,
      court,
    });
    return this.courtPriceRepository.save(price);
  }

  async findAllCourtPrices(courtId?: number) {
    const where = courtId ? { court_id: courtId } : {};
    return this.courtPriceRepository.find({
      where,
      relations: ['court'],
    });
  }

  async findCourtPriceById(id: number) {
    const price = await this.courtPriceRepository.findOne({
      where: { id },
      relations: ['court'],
    });
    if (!price) {
      throw new NotFoundException('Court price not found');
    }
    return price;
  }

  async updateCourtPrice(id: number, data: Partial<CreateCourtPriceDto>) {
    await this.findCourtPriceById(id);
    if (data.court_id) {
      await this.findCourtById(data.court_id);
    }
    await this.courtPriceRepository.update(id, data);
    return this.findCourtPriceById(id);
  }

  async deleteCourtPrice(id: number) {
    await this.findCourtPriceById(id);
    await this.courtPriceRepository.delete(id);
    return { message: 'Court price deleted successfully' };
  }

  async addManyLocationImages(locationId: number, imageUrls: string[]) {
    // Verify location exists
    const location = await this.findLocationById(locationId);
    
    const locationImages = imageUrls.map((imageUrl) => {
      return this.locationImageRepository.create({
        location_id: locationId,
        image_url: imageUrl,
        location,
      });
    });
    
    await this.locationImageRepository.save(locationImages);
  }

  async getLocationImages(locationId: number) {
    // Verify location exists
    await this.findLocationById(locationId);
    
    return this.locationImageRepository.find({
      where: { location_id: locationId },
    });
  }

  async deleteLocationImage(id: number) {
    const image = await this.locationImageRepository.findOne({
      where: { id },
    });
    
    if (!image) {
      throw new NotFoundException('Location image not found');
    }
    
    await this.locationImageRepository.delete(id);
    return { message: 'Location image deleted successfully' };
  }
} 
