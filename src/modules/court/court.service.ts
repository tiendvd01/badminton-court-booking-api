import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entity/location.entity';
import { Court } from './entity/court.entity';
import { LocationImage } from './entity/location-image.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateCourtDto } from './dto/create-court.dto';

@Injectable()
export class CourtService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
    @InjectRepository(LocationImage)
    private locationImageRepository: Repository<LocationImage>,
  ) {}

  async createLocation(locationData: CreateLocationDto) {
    const location = this.locationRepository.create({
      ...locationData,
    });

    return this.locationRepository.save(location);
  }

  async findAllLocations(filters?: {
    province?: string;
    district?: string;
    search?: string;
  }) {
    const query = this.locationRepository
      .createQueryBuilder('location')
      .leftJoinAndSelect('location.courts', 'courts')
      .leftJoinAndSelect('location.owner', 'owner')
      .leftJoinAndSelect('location.images', 'images');

    if (filters?.province) {
      // Tìm kiếm đơn giản với LIKE và LOWER
      query.andWhere('LOWER(location.address) LIKE LOWER(:province)', {
        province: `%${filters.province}%`,
      });
    }

    if (filters?.district) {
      query.andWhere('LOWER(location.address) LIKE LOWER(:district)', {
        district: `%${filters.district}%`,
      });
    }

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      query.andWhere(
        '(LOWER(location.name) LIKE LOWER(:search) OR LOWER(location.address) LIKE LOWER(:search))',
        { search: searchTerm },
      );
    }

    return query.getMany();
  }

  async findLocationById(id: number) {
    const location = await this.locationRepository.findOne({
      where: { id },
      relations: ['courts', 'images', 'owner'],
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
      relations: ['location', 'priceTable'],
    });
  }

  async findCourtById(id: number) {
    const court = await this.courtRepository.findOne({
      where: { id },
      relations: ['location', 'priceTable'],
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

    return await this.locationImageRepository.save(locationImages);
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
