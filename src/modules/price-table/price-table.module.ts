import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PriceTable } from "./entity/price-table.entity";
import { PriceTableService } from "./price-table.service";
import { PriceTableController } from "./price-table.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([PriceTable]),
  ],
  controllers: [PriceTableController],
  providers: [PriceTableService],
  exports: [PriceTableService],
})
export class PriceTableModule {}
