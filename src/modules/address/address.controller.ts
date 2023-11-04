import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('address')
export class AddressController {

    constructor(
        private readonly service: AddressService
    ){}


    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@User() user, @Body() dto) {
        return await this.service.create(dto, user)
    }
}
