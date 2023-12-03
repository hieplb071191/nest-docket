// import { Test, TestingModule } from '@nestjs/testing';
// import { AddressController } from './address.controller';
// import { AddressService } from './address.service';
// import { AddressRepository } from './repositories/address.repository';
// import { Addresses } from './entities/address.entity';

// describe('AddressController', () => {
//   let controller: AddressController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [AddressController],
//       providers: [
//         AddressService,
//         AddressRepository,
//         {
//           provide: 'AddressInterface',
//           useClass: Addresses
//         }
//       ]
//     }).compile();

//     controller = module.get<AddressController>(AddressController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
