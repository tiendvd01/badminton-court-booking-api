import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { Location } from './entity/location.entity';
import { Court } from './entity/court.entity';
import { LocationImage } from './entity/location-image.entity';
import { cloudinaryStorage } from 'configs/cloudinary';

@Module({
  imports: [
    TypeOrmModule.forFeature([Location, Court, LocationImage]),
    MulterModule.register({
      storage: cloudinaryStorage,
    }),
  ],
  controllers: [CourtController],
  providers: [CourtService],
  exports: [CourtService],
})
export class CourtModule {}
