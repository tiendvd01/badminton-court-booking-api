import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class InitCourtTables1743321421803 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create locations table
    await queryRunner.createTable(
      new Table({
        name: 'locations',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'owner_id',
            type: 'int',
            isNullable: false,
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

    // Create courts table
    await queryRunner.createTable(
      new Table({
        name: 'courts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'location_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image_url',
            type: 'varchar',
            length: '255',
            isNullable: true,
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

    // Create court_prices table
    await queryRunner.createTable(
      new Table({
        name: 'court_prices',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'court_id',
            type: 'int',
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
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
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

    // Add foreign key constraints
    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        columnNames: ['owner_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'courts',
      new TableForeignKey({
        columnNames: ['location_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'locations',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'court_prices',
      new TableForeignKey({
        columnNames: ['court_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'courts',
        onDelete: 'CASCADE',
      }),
    );

    // Add indexes for better query performance
    await queryRunner.createIndex(
      'locations',
      new TableIndex({
        name: 'IDX_LOCATION_OWNER_ID',
        columnNames: ['owner_id'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'courts',
      new TableIndex({
        name: 'IDX_COURT_LOCATION_ID',
        columnNames: ['location_id'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'court_prices',
      new TableIndex({
        name: 'IDX_COURT_PRICE_COURT_ID',
        columnNames: ['court_id'],
        isUnique: false,
      }),
    );

    await queryRunner.createIndex(
      'court_prices',
      new TableIndex({
        name: 'IDX_COURT_PRICE_TIME_RANGE',
        columnNames: ['start_time', 'end_time'],
        isUnique: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.dropTable('court_prices');
    await queryRunner.dropTable('courts');
    await queryRunner.dropTable('locations');
  }
} 