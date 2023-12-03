import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1701597536707 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.addColumn('products',
                new TableColumn({
                    name: 'subCategoryId',
                    type: 'uuid',
                })
            )
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
