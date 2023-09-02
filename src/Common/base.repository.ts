import { Injectable } from "@nestjs/common";
import { Document, Repository } from "typeorm";


@Injectable()
export class BaseRepository <T> {
    constructor(
        protected readonly model: Repository<T>
    ){}

    async findAll(query): Promise<T[]> {
        return await this.model.find(query)
    }
}