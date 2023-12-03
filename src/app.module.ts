import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ormconfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from './modules/email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { BranchModule } from './modules/branch/branch.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: ((config: ConfigService) => {
        return {
          type: 'postgres',
          host:  config.get<string>('DB_HOST'),
          port:  config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          synchronize: false,
          autoLoadEntities: true,
        }
      }),
      inject: [ConfigService]
    }),
    UserModule,
    CategoryModule,
    AuthModule,
    EmailModule,
    AddressModule,
    ProductModule,
    BranchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
