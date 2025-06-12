import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteQrImageField1749715569574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('owner_payments', 'qr_image');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
