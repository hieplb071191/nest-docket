import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/Common/base.repository";
import { BranchEntity } from "../entities/branch.entity";
import { Repository } from "typeorm";


@Injectable()
export class BranchRepository extends BaseRepository<BranchEntity> {
    constructor(
        @InjectRepository(BranchEntity)
        protected model: Repository<BranchEntity>
    ){
        super(model)
    }
}