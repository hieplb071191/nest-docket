import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701611682814 implements MigrationInterface {
    name = 'Migration1701611682814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product_images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T13:54:44.432Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T13:54:44.432Z"', "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "imgUrl" character varying NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_1974264ea7265989af8392f63a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_details_size_enum" AS ENUM('XL', 'X', 'L', 'M', 'XS')`);
        await queryRunner.query(`CREATE TABLE "product_details" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T13:54:44.432Z"', "updatedAt" TIMESTAMP NOT NULL DEFAULT '"2023-12-03T13:54:44.432Z"', "createdBy" character varying NOT NULL, "updatedBy" character varying NOT NULL, "productId" uuid NOT NULL, "size" "public"."product_details_size_enum" NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "price" integer NOT NULL DEFAULT '0', "color" character varying NOT NULL, CONSTRAINT "PK_a3fa8e2e94f3c37a8d731451de4" PRIMARY KEY ("id"))`);
        // await queryRunner.query(`ALTER TABLE "categories" ADD "parentId" uuid`);
        await queryRunner.query(`ALTER TABLE "products" ADD "productId" uuid`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "createdAt" SET DEFAULT '"2023-12-03T13:54:44.431Z"'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updatedAt" SET DEFAULT '"2023-12-03T13:54:44.431Z"'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" SET DEFAULT '"2023-12-03T13:54:44.433Z"'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" SET DEFAULT '"2023-12-03T13:54:44.433Z"'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '"2023-12-03T13:54:44.435Z"'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '"2023-12-03T13:54:44.435Z"'`);
        await queryRunner.query(`ALTER TABLE "product_images" ADD CONSTRAINT "FK_b367708bf720c8dd62fc6833161" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ad42985fb27aa9016b16ee740ec" FOREIGN KEY ("subCategoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_7b3b507508cd0f86a5b2e923459" FOREIGN KEY ("productId") REFERENCES "product_images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_7b3b507508cd0f86a5b2e923459"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ad42985fb27aa9016b16ee740ec"`);
        await queryRunner.query(`ALTER TABLE "product_images" DROP CONSTRAINT "FK_b367708bf720c8dd62fc6833161"`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "updated" SET DEFAULT '2023-12-03 03:03:52.98'`);
        await queryRunner.query(`ALTER TABLE "categories" ALTER COLUMN "createdAt" SET DEFAULT '2023-12-03 03:03:52.98'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "updatedAt" SET DEFAULT '2023-12-03 03:03:52.981'`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "createdAt" SET DEFAULT '2023-12-03 03:03:52.981'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "updatedAt" SET DEFAULT '2023-12-03 03:03:52.981'`);
        await queryRunner.query(`ALTER TABLE "branch" ALTER COLUMN "createdAt" SET DEFAULT '2023-12-03 03:03:52.981'`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "productId"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "parentId"`);
        await queryRunner.query(`DROP TABLE "product_details"`);
        await queryRunner.query(`DROP TYPE "public"."product_details_size_enum"`);
        await queryRunner.query(`DROP TABLE "product_images"`);
    }

}
