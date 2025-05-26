import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class InitOwnerPaymentsTable1743321421805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'owner_payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'account_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'payment_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'bank_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'bank_info',
            type: 'json',
            isNullable: true,
          },
          {
            name: 'qr_image',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'owner_payments',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'owner_payments',
      new TableIndex({
        name: 'UQ_BANK_CODE_PAYMENT_NUMBER',
        columnNames: ['bank_code', 'payment_number'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop table
    await queryRunner.dropTable('owner_payments');
  }
}
