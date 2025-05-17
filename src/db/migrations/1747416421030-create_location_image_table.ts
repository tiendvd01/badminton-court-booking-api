import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLocationImageTable1747416421030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'location_images',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'location_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'image_url',
                        type: 'text',
                        isNullable: false,
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FK_LOCATION_IMAGE_LOCATION',
                        columnNames: ['location_id'],
                        referencedTableName: 'locations',
                        referencedColumnNames: ['id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('location_images');
    }

}
