import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { BranchService } from './branch.service';
import { BranchCreateDto } from './dto/branchCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Role } from 'src/Common/roles.enum';
import { RoleGuards } from 'src/guards/role.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('branch')
export class BranchController {
    constructor(
        private readonly service: BranchService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @Roles([Role.ADMIN])
    @UseGuards(RoleGuards)
    createBranch(@Body() dto: BranchCreateDto, @User() user) {
        return this.service.createBranch(dto, user)
    }
}
