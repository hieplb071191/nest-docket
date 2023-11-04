import { Injectable } from '@nestjs/common';
import { AddressRepository } from './repositories/address.repository';

@Injectable()
export class AddressService {
    constructor(
        private readonly repository: AddressRepository
    ){}

    async create(dto, user) {
        const model = {
            ...dto,
            userId: user.id
        }

        return await this.repository.create(model)
    }
}

