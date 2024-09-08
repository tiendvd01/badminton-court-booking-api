import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1725809728446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            length: '250',
          },
          {
            name: 'bio',
            type: 'text',
          },
          {
            name: 'role',
            type: 'varchar',
          },
        ],
      }),
    );
    // Create post table
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
