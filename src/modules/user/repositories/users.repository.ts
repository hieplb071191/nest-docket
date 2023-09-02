import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "../entities/user.entity";
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

}