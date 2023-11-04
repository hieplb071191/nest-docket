import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/modules/user/entities/user.entity";
import { BaseEntity, Repository } from "typeorm";
import { BaseRepository } from "src/Common/base.repository";

@Injectable()
export class  UserRepository extends BaseRepository<Users>{
    constructor(
        @InjectRepository(Users)
        protected readonly model: Repository<Users>
    ){
        super(model)
    }
    async create(doc) {

        return this.model.save(doc)
    }

    async createMany(docs): Promise<Users[]> {
        const entities = this.model.create(docs)
        const result = this.model.save(entities)
        return result
    }

    async updateOne(query, params): Promise<any> {
        return await this.model.update(query, params)
    }
}