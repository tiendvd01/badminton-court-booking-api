import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtController } from './court.controller';
import { CourtService } from './court.service';
import { Location } from './entity/location.entity';
import { Court } from './entity/court.entity';
import { CourtPrice } from './entity/court-price.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Court, CourtPrice])],
  controllers: [CourtController],
  providers: [CourtService],
  exports: [CourtService],
})
export class CourtModule {}