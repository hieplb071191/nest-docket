import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/modules/user/entities/user.entity";
import { BaseEntity, Repository } from "typeorm";
import { BaseRepository } from "src/Common/base.repository";
import { source } from "src/config/typeormSource.config";
import { Addresses } from "src/modules/address/entities/address.entity";
import { UserInfoView } from "../entities/userInfoView.entity";

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


    async getInfo(query: any) {
        const result = await source.getRepository(Users)
            .createQueryBuilder('u')
            .select()
            .addSelect(['a.lat', 'a.long', 'a.id'])
            .addSelect(`( 6371  * acos( cos( radians(37) ) * cos( radians(cast (a.lat as double precision) ) ) 
            * cos( radians(cast(a.long as double precision)) - radians(-122) ) + sin( radians(37) ) * sin(radians(cast (a.lat as double precision))) ) )`, 'u_distance')
            .leftJoin('u.addresses', 'a')
            .where('u.email = :email',{email: query.email}).getOne()
        console.log(result)
        return result
    }

    async getInfoUser(id) {
        const result = await source.manager.findOne(UserInfoView, {
            where: {
                u_id: id
            }
        })
        return result
    }
}