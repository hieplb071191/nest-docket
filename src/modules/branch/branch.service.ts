import { BadGatewayException, Injectable, OnModuleInit } from '@nestjs/common';
import { BranchRepository } from './repositories/branch.repository';
import { BranchCreateDto } from './dto/branchCreate.dto';

@Injectable()
export class BranchService implements OnModuleInit {
    constructor(
        private readonly repository: BranchRepository
    ){}

    onModuleInit() {
        console.log()
    }

    async createBranch(dto: BranchCreateDto, user) {
        const oldBranch = await this.repository.findOne({
            where: {
                title: dto.title
            }
        })

        if (oldBranch) {
            throw new BadGatewayException({
                msg: 'title duplicate'
            })
        }

        return await this.repository.create({
            title: dto.title,
            createdBy: user.id,
            updatedBy: user.id,
        })
    }
}
