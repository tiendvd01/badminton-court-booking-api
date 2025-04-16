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
            isNullable: false,
          },
          {
            name: 'court_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'booking_date',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'start_time',
            type: 'time',
            isNullable: false,
          },
          {
            name: 'end_time',
            type: 'time',
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
            type: 'enum',
            enum: ['pending', 'completed', 'failed'],
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

    // Create payments table
    await queryRunner.createTable(
      new Table({
        name: 'payments',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'booking_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'failed'],
            default: "'pending'",
            isNullable: false,
          },
          {
            name: 'payment_image',
            type: 'varchar',
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

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['court_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courts',
        onDelete: 'CASCADE',
      }),
    );

    // Add foreign key constraint for payments
    await queryRunner.createForeignKey(
      'payments',
      new TableForeignKey({
        columnNames: ['booking_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'bookings',
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

    await queryRunner.createIndex(
      'bookings',
      new TableIndex({
        name: 'IDX_BOOKING_COURT_ID',
        columnNames: ['court_id'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'bookings',
      new TableIndex({
        name: 'IDX_BOOKING_DATE_TIME',
        columnNames: ['booking_date', 'start_time', 'end_time'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'bookings',
      new TableIndex({
        name: 'IDX_BOOKING_STATUS',
        columnNames: ['status'],
        isUnique: false,
      }),
    );

    // Add indexes for payments
    await queryRunner.createIndex(
      'payments',
      new TableIndex({
        name: 'IDX_PAYMENT_BOOKING_ID',
        columnNames: ['booking_id'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'payments',
      new TableIndex({
        name: 'IDX_PAYMENT_STATUS',
        columnNames: ['status'],
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