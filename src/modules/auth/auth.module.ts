import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CryptoProviderService } from 'src/shared/services/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleService } from 'src/shared/services/google.service';
import { EmailModule } from '../email/email.module';
import { JwtStrategy } from 'src/strategies/jwt.strategy';
import { RoleGuards } from 'src/guards/role.guard';
import { AddressModule } from '../address/address.module';


@Module({
  imports: [
    UserModule,
    AddressModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRECT'),
        global: true,
        signOptions: { expiresIn: '604800s' },
      }),
      inject: [ConfigService]
    }),
    forwardRef(() => EmailModule)
  ],
  controllers: [AuthController],
  providers: [AuthService, CryptoProviderService, GoogleService, JwtStrategy,RoleGuards  ]
})
export class AuthModule {}
