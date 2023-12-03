import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1701601646328 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await Promise.all([
            queryRunner.changeColumn('categories', 
                'parentId',
                new TableColumn({
                    name: 'parentId',
                    type: 'uuid',
                    isNullable: true
                })
            ),
            queryRunner.addColumn('products',
            new TableColumn({
                name: 'subCategoryId',
                type: 'uuid',
                isNullable: true
            }))
        ])
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
