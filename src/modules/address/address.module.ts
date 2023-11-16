import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Addresses } from './entities/address.entity';
import { AddressRepository } from './repositories/address.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Addresses])
    ],
  controllers: [AddressController],
  providers: [AddressService, AddressRepository],
  exports: [AddressService, AddressRepository]
})
export class AddressModule {}
