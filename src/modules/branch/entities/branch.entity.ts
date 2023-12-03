import { ProductEntity } from "src/modules/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'branch'})
export class BranchEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column({
        type: String,
        nullable: false
    })
    title: string;

    @Column({
        type: Date,
        default: new Date()
    })
    createdAt: Date;

    @Column({
        type: Date,
        default: new Date()
    })
    updatedAt: Date

    @Column({
        type: String,
    })
    createdBy: string;

    @Column({
        type: String,
    })
    updatedBy: string

    @OneToMany(type => ProductEntity, products => products.branch)
    products: ProductEntity

}