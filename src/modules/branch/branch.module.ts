import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { BranchRepository } from './repositories/branch.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchEntity } from './entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BranchEntity])
  ],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository]
})
export class BranchModule {}
