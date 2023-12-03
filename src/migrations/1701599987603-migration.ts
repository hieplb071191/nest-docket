import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1701599987602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all([
            queryRunner.addColumn('categories', new TableColumn({
                name: 'parentId',
                type: 'uuid',
                isNullable: true
            }))
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
