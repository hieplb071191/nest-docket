import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1701612052983 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([queryRunner.addColumn('products', new TableColumn({
            name: 'description',
            type: 'varchar'
        }))])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
