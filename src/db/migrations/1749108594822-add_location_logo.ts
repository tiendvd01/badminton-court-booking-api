import {MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddLocationLogo1749108594822 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('locations', new TableColumn({
            name: "logo",
            type: "varchar",
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('locations', 'logo');
    }

}
