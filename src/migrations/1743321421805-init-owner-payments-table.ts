import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

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
            name: 'bank_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop table
    await queryRunner.dropTable('owner_payments');
  }
}