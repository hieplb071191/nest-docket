import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(
        private service: ProductService
    ){}

    @Get('/get-by-query')
    getByQuery(@Query() query) {
        return this.service.getAllProductByQuery(query)
    }
}
