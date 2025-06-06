import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceTable } from "./entity/price-table.entity";
import { PriceTableService } from "./price-table.service";
import { PriceTableController } from "./price-table.controller";
import { Location } from "@modules/court/entity/location.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceTable, Location]),
  ],
  controllers: [PriceTableController],
  providers: [PriceTableService],
  exports: [PriceTableService],
})
export class PriceTableModule {}
