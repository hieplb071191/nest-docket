import { CommonEntity } from "src/Common/common.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { ProductEntity } from "./product.entity";


@Entity({
    name: 'product_images'
})
export class ProductImageEntity extends CommonEntity {
     @Column({
        type: 'varchar',
        nullable: false
     })
     imgUrl: string;

     @Column({
        type: 'uuid',
        nullable: false
     })
     productId: string;

     @ManyToOne(type => ProductEntity, product => product.productImages)
     @JoinColumn({
        name: 'productId'
     })
     product: ProductEntity
}