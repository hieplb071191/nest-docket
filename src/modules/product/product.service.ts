import { Injectable } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
    constructor(
        private repository: ProductRepository
    ){}

    async getAllProductByQuery(query) {
        const { search, categoryId, subCategoryId, branchId } = query 
        return await this.repository.getAllProduct({ search, categoryId, subCategoryId, branchId })
    }
}
