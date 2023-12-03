import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/Common/base.repository";
import { ProductEntity } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { source } from '../../../config/typeormSource.config'


@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
    constructor(
        @InjectRepository(ProductEntity)
        protected readonly model: Repository<ProductEntity>
    ){
        super(model)
    }

    async getAllProduct({ search, categoryId, subCategoryId, branchId }) {
        let query = source.getRepository(ProductEntity)
            .createQueryBuilder('p')
            .select()
            .addSelect(['c.id', 'c.title', 'sc.id', 'sc.title'])
            .addSelect(['b.id', 'b.title'])
            .leftJoin('p.category', 'c')
            .leftJoin('p.subCategory', 'sc')
            .leftJoin('p.branch', 'b')
            .where(`p.id is not null`)

        if (search) {
            query.andWhere(`p.name ilike '%${search}%'`)
        }
        if (categoryId) {
            query.andWhere(`c.id = '${categoryId}'`)
        } 
        if (subCategoryId) {
            query.andWhere(`sc.id = '${subCategoryId}'`)
        }

        if (branchId) {
            query.andWhere(`b.id = '${branchId}'`)
        }


        return query.getMany() 
    }
}