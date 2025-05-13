import { MigrationInterface, QueryRunner } from "typeorm";
import { Table } from "typeorm";
import * as bcrypt from "bcrypt";

export class InitUserTable1743321421802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["admin", "owner", "customer"],
                        default: "'customer'",
                    },
                    {
                        name: "avatar_url",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "token_version",
                        type: "varchar",
                        length: "36",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                    },
                ],
            }),
            true
        );
        
        // Create default admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await queryRunner.query(`
            INSERT INTO users (name, email, password, role)
            VALUES ('Admin User', 'admin@gmail.com', '${hashedPassword}', 'admin')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }
}
