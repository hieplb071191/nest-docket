import { BranchEntity } from "src/modules/branch/entities/branch.entity";
import { Categories } from "../../../modules/category/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductImageEntity } from "./product-image.entity";

@Entity({name: 'products'})
export class ProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: String, nullable: false})
    name: string;

    @Column({type: String, nullable: false})
    categoryId: string;

    @Column({type: String, nullable: false})
    branchId: string;

    @Column({type: Date, default: new Date()})
    createdAt: Date;

    @Column({type: Date, default: new Date()})
    updatedAt: Date;

    @Column({type: String, nullable: false})
    createdBy: string;

    @Column({type: String, nullable: false})
    updatedBy: string;

    @ManyToOne(type => Categories, category => category.products, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'categoryId'
    })
    category: Categories


    @ManyToOne(type => Categories, subCategory => subCategory.subProducts)
    @JoinColumn({
        name: 'subCategoryId'
    })
    subCategory: Categories

    @ManyToOne(type => BranchEntity, branch => branch.products)
    @JoinColumn({
        name: 'branchId'
    })
    branch: string;

    @ManyToOne(type => ProductImageEntity, productImage => productImage.product)
    @JoinColumn({
        name: 'productId'
    })
    productImages: ProductImageEntity[]

    @ManyToOne(type => ProductImageEntity, productDetail => productDetail.product)
    @JoinColumn({
        name: 'productId'
    })
    productDetails: ProductImageEntity[]
}

