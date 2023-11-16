import { BadRequestException, Injectable } from '@nestjs/common';
import { AddressRepository } from './repositories/address.repository';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
    constructor(
        private readonly repository: AddressRepository
    ){}

    async create(dto: CreateAddressDto, user) {
        const model = {
            ...dto,
            userId: user.id
        }

        const olddAddress = await this.repository.findOne({where: {
            lat: model.lat,
            long: model.long,
        }})

        if (olddAddress) {
            throw new BadRequestException('address was existed')
        }

        return await this.repository.create(model)
    }
}

