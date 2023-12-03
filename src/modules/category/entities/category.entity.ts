import { ProductEntity } from "../../../modules/product/entities/product.entity";
import { Users } from "../../../modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Categories {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: String, nullable: false})
    title: string;

    @Column({ type: String})
    slug: string;

    @Column({ type: Date, default: new Date()})
    createdAt: Date;

    @Column({ type: Date, default: new Date()})
    updated: Date;
    
    @Column({ type: String, nullable: false})
    createdBy

    @ManyToOne((type) => Users)
    @JoinColumn({
        name: 'createdBy'
    })
    users: Users

    @OneToMany(type => ProductEntity, product => product.category)
    @JoinColumn({
        name: 'categoryId'
    })
    products: ProductEntity[]

    @OneToMany(type => ProductEntity, product => product.subCategory)
    @JoinColumn({
        name: 'subCategoryId'
    })
    subProducts: ProductEntity[]
}