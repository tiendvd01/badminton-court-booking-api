import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ExtendPaymentImageCol1750650960598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('bookings', 'payment_image', new TableColumn({
            name: 'payment_image',
            type: 'text',
            isNullable: true,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
