import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceTable } from "./entity/price-table.entity";
import { Price } from "./entity/price.entity";
import { PriceTableService } from "./price-table.service";
import { PriceTableController } from "./price-table.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceTable, Price]),
  ],
  controllers: [PriceTableController],
  providers: [PriceTableService],
  exports: [PriceTableService],
})
export class PriceTableModule {}
