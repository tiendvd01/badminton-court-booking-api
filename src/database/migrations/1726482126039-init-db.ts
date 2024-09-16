import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1726482126039 implements MigrationInterface {
    name = 'InitDb1726482126039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cover_image\` varchar(255) NOT NULL, \`title\` text NOT NULL, \`body\` longtext NOT NULL, \`slug\` varchar(2000) NOT NULL, \`reactions\` text NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`avatar\` varchar(255) NOT NULL, \`bio\` text NOT NULL, \`role\` enum ('admin', 'user') NOT NULL DEFAULT 'user', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` text NOT NULL, \`userId\` int NULL, \`postId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_tags_tag\` (\`postId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_b651178cc41334544a7a9601c4\` (\`postId\`), INDEX \`IDX_41e7626b9cc03c5c65812ae55e\` (\`tagId\`), PRIMARY KEY (\`postId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_users_who_saved_user\` (\`postId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_dbd58706e0f3df026a68edd3df\` (\`postId\`), INDEX \`IDX_300c1bac25347d3def689d4db6\` (\`userId\`), PRIMARY KEY (\`postId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` ADD CONSTRAINT \`FK_b651178cc41334544a7a9601c45\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` ADD CONSTRAINT \`FK_41e7626b9cc03c5c65812ae55e8\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_users_who_saved_user\` ADD CONSTRAINT \`FK_dbd58706e0f3df026a68edd3df6\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_users_who_saved_user\` ADD CONSTRAINT \`FK_300c1bac25347d3def689d4db6c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_users_who_saved_user\` DROP FOREIGN KEY \`FK_300c1bac25347d3def689d4db6c\``);
        await queryRunner.query(`ALTER TABLE \`post_users_who_saved_user\` DROP FOREIGN KEY \`FK_dbd58706e0f3df026a68edd3df6\``);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` DROP FOREIGN KEY \`FK_41e7626b9cc03c5c65812ae55e8\``);
        await queryRunner.query(`ALTER TABLE \`post_tags_tag\` DROP FOREIGN KEY \`FK_b651178cc41334544a7a9601c45\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`DROP INDEX \`IDX_300c1bac25347d3def689d4db6\` ON \`post_users_who_saved_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_dbd58706e0f3df026a68edd3df\` ON \`post_users_who_saved_user\``);
        await queryRunner.query(`DROP TABLE \`post_users_who_saved_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_41e7626b9cc03c5c65812ae55e\` ON \`post_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_b651178cc41334544a7a9601c4\` ON \`post_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`post_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
    }

}
