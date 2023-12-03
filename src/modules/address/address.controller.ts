import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
export class AddressController {

    constructor(
        private readonly service: AddressService
    ){}
s

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@User() user, @Body() dto: CreateAddressDto) {
        return await this.service.create(dto, user)
    }
}
