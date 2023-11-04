import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from 'src/Common/roles.enum';
import { Roles } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RoleGuards } from 'src/guards/role.guard';

@Controller('category')
export class CategoryController {
    constructor(
        private service: CategoryService
    ){}

    @UseGuards(JwtAuthGuard)
    @Roles([Role.ADMIN, Role.USER])
    @UseGuards(RoleGuards)
    @Post()
    createCategory(@Body() dto: any){
        return this.service.create(dto)
    }
}
