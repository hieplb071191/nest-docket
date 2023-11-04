import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1698934276396 implements MigrationInterface {
    name = 'Migration1698934276396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "province" character varying NOT NULL, "district" character varying NOT NULL, "ward" character varying NOT NULL, "specifically" character varying NOT NULL, "lat" character varying NOT NULL, "long" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "addressId"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '"2023-11-02T14:11:17.850Z"'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '"2023-11-02T14:11:17.850Z"'`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068" FOREIGN KEY ("createdBy") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_fb69fc5cdf3d7351b17eb5e9068"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '2023-10-29 10:58:52.47'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '2023-10-29 10:58:52.47'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "addressId" character varying`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
