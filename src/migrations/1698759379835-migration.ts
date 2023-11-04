import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class Migration1698759379835 implements MigrationInterface {
    name='Migration1698759379835'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', 
            new TableColumn({
                name: 'addressId',
                type: 'varchar',
                isNullable: true,
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
