import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698577131021 implements MigrationInterface {
    name = 'Migration1698577131021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(25) NOT NULL, "email" character varying(25) NOT NULL, "password" character varying, "address" character varying, "dob" TIMESTAMP, "isTwoFA" boolean NOT NULL DEFAULT false, "loginSystem" character varying NOT NULL DEFAULT 'system', "isConfirm" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-10-29T10:58:52.470Z"', "updated" TIMESTAMP NOT NULL DEFAULT '"2023-10-29T10:58:52.470Z"', "createdBy" uuid NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068" FOREIGN KEY ("createdBy") REFERENCES "users"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
