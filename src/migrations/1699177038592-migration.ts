import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1699177038592 implements MigrationInterface {
    name = 'Migration1699177038592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '"2023-11-05T09:37:20.170Z"'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '"2023-11-05T09:37:20.170Z"'`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_067726fd63023d75181f6ab9ff"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "lat" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "long" real NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "UQ_95c93a584de49f0b0e13f753630" UNIQUE ("userId")`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_067726fd63023d75181f6ab9ff" ON "addresses" ("lat", "long") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a3ffb1c0c8416b9fc6f907b7433" FOREIGN KEY ("id") REFERENCES "addresses"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a3ffb1c0c8416b9fc6f907b7433"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_067726fd63023d75181f6ab9ff"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "UQ_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "userId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "long"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "long" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "addresses" DROP COLUMN "lat"`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD "lat" character varying NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_067726fd63023d75181f6ab9ff" ON "addresses" ("lat", "long") `);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '2023-11-04 09:19:51.464'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '2023-11-04 09:19:51.464'`);
    }

}
