import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { BaseRepository } from '../../Common/base.repository';
import { Addresses } from './entities/address.entity';
import { AddressRepository } from './repositories/address.repository';
import { AddressController } from './address.controller';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        AddressController
      ],
      providers: [
        AddressService,
        AddressRepository,
        {
          provide: 'BaseRepositoryInteface',
          useClass: BaseRepository
        },
        {
          provide: 'AddressInterfaces',
          useClass: Addresses
        }
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
