import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { UserRepository } from './repositories/users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
