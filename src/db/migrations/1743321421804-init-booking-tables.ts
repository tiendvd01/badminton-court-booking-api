import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitBookingTables1743321421804 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create bookings table
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'customer_id',
            type: 'int',
            isNullable: true
          },
          {
            name: 'location_id',
            type: 'int',
            isNullable: false
          },
          {
            name: 'booking_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: "customer_info",
            type: "json",
            isNullable: true,
          },
          {
            name: 'slots',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'total_price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'note',
            type: 'text',
            isNullable: true,
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

    // Add foreign key constraints for bookings
    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['customer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    // Add indexes for bookings
    await queryRunner.createIndex(
      'bookings',
      new TableIndex({
        name: 'IDX_BOOKING_CUSTOMER_ID',
        columnNames: ['customer_id'],
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables
    await queryRunner.dropTable('payments');
    await queryRunner.dropTable('bookings');
  }
} 