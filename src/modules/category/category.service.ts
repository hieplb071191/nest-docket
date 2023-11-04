import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/category.repository';
import { CreateCategory } from './dto/category-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categories } from './entities/category.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Categories)
        private readonly model: Repository<Categories>,
        private readonly repository: CategoryRepository
    ){}

    async create(dto: CreateCategory) {
        // const oldModel = await this.model.findOne(
        //     {   select: ['id', 'title'],
        //         where: {
        //             title: dto.title
        //         },
        //         relations: ['users']
        //     })  

        const oldModel = await this.repository.findOne(dto)

        if(oldModel) {
            throw new BadRequestException('title existed')
        }

        const slug = this.createSlug(dto.title)
        const model = {
            ...dto,
            slug,
            createdAt: new Date(),
            updated: new Date(),
        }
        return await this.repository.create(model)
    }


    createSlug(string: string) {
        let slugArr = [`${new Date().getTime()}`]
        const titleArr = string.split(' ')
        slugArr = [...slugArr, ...titleArr]
        return slugArr.join(',')
    }

}
