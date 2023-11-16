import { Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly repository: UserRepository
    ){}

    async getAll(query) {
        return await this.repository.findAll(query)
    }

    async createUser(params) {
        return await this.repository.create(params)
    }

    async getInfo(user) {
        return await this.repository.getInfoUser(user.id)
    }
}
