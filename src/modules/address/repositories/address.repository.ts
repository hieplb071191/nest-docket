import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../../Common/base.repository";
import { Repository } from "typeorm";
import { Addresses } from "../entities/address.entity";


@Injectable()
export class AddressRepository extends BaseRepository<Addresses> {

    constructor(
        @InjectRepository(Addresses)
        protected model: Repository<Addresses>
    ) {
        super(model)
    }
}