import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodeForBooking1749702020860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('bookings', new TableColumn({
            name: 'booking_code',
            type: 'varchar',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('bookings', 'booking_code');
    }

}
