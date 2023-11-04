import { Injectable, OnModuleInit } from "@nestjs/common";
import { Repository, getRepository } from "typeorm/index";
import { Categories } from "../entities/category.entity";
import { BaseRepository } from "src/Common/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { source } from "src/config/typeormSource.config";



@Injectable()
export class CategoryRepository extends BaseRepository<Categories> implements OnModuleInit {
    private source;
    constructor(
        @InjectRepository(Categories)
        protected readonly model: Repository<Categories>
    ){
        super(model)
    }
    async onModuleInit() {
        this.source = await source.initialize()
    }

    async findOption(query) {
        const result = await this.source.getRepository(Categories).
        createQueryBuilder('c').
        select(['c.id','c.title']).
        innerJoin('c.users','u', "c.createdBy = u.id").
        addSelect(['u.email', 'u.username'])
        .where('c.title = :title', {title: query.title}).getOne()
        console.log(result)
        return result
    }


}