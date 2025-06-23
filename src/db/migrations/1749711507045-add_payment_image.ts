import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPaymentImage1749711507045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('bookings', new TableColumn({
            name: 'payment_image',
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('bookings', 'payment_image');
    }

}
``