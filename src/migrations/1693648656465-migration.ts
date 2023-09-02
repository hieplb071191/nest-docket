import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1693648656465 implements MigrationInterface {
    name = 'Migration1693648656465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`username\` varchar(25) NOT NULL, \`email\` varchar(25) NOT NULL, \`password\` varchar(255) NULL, \`address\` varchar(255) NULL, \`dob\` datetime NULL, \`isTwoFA\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
