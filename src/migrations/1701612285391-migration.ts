import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1701612285391 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([queryRunner.addColumn('products', new TableColumn({
            name: 'description',
            type: 'varchar',
            isNullable: true
        }))])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
