import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701572631489 implements MigrationInterface {
    name = 'Migration1701572631489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "province" character varying NOT NULL, "district" character varying NOT NULL, "ward" character varying NOT NULL, "specifically" character varying NOT NULL, "lat" real NOT NULL, "long" real NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "REL_95c93a584de49f0b0e13f75363" UNIQUE ("userId"), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_067726fd63023d75181f6ab9ff" ON "addresses" ("lat", "long") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(25) NOT NULL, "email" character varying(25) NOT NULL, "password" character varying, "address" character varying, "dob" TIMESTAMP, "isTwoFA" boolean NOT NULL DEFAULT false, "loginSystem" character varying NOT NULL DEFAULT 'system', "isConfirm" boolean NOT NULL DEFAULT false, "userId" uuid, CONSTRAINT "REL_8bf09ba754322ab9c22a215c91" UNIQUE ("userId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "slug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.980Z"', "updated" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.980Z"', "createdBy" uuid NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "categoryId" uuid NOT NULL, "branchId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.981Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.981Z"', "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.981Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T03:03:52.981Z"', "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, CONSTRAINT "PK_2e39f426e2faefdaa93c5961976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8bf09ba754322ab9c22a215c919" FOREIGN KEY ("userId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_dd1b22e313f7e7d28805557261f" FOREIGN KEY ("branchId") REFERENCES "branch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_dd1b22e313f7e7d28805557261f"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8bf09ba754322ab9c22a215c919"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "branch"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_067726fd63023d75181f6ab9ff"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
