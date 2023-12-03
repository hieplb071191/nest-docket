import { CommonEntity } from "src/Common/common.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity({
    name: 'product_details'
})
export class ProductDetailEntity extends CommonEntity {
    @Column({
        type: 'uuid',
        nullable: false
    })
    productId: string;

    @Column({
        type: 'enum',
        enum: ['XL','X', 'L' ,'M', 'XS', ]
    })
    size: string;

    @Column({
        type: 'integer',
        default: 0
    })
    quantity: number;

    @Column({
        type: 'integer',
        default: 0
    })
    price: number;

    @Column({
        type: 'varchar',
    })
    color: string;

    @ManyToOne(type => ProductEntity, product => product.productDetails)
     @JoinColumn({
        name: 'productId'
     })
     product: ProductEntity
}