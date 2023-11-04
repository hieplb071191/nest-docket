import { Injectable } from "@nestjs/common";
import { Document, Repository, SaveOptions } from "typeorm";
import * as _ from 'lodash'

@Injectable()
export class BaseRepository <T> {
    constructor(
        protected readonly model: Repository<T>
    ){}

    async findAll(query): Promise<T[]> {
        return await this.model.find(query)
    }

    async findOne(query): Promise<T> {
        return await this.model.findOne(query)
    }

    async create(params): Promise<T |T[]> {
        const saveModel = await this.model.create(params)
        return await this.model.save(params)
    }

}