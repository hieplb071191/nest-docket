import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });
import { ConfigService } from '@nestjs/config';
const config = new ConfigService()

config.get<string>('DB_HOST')

export const ormconfig: DataSourceOptions = {
    type: 'postgres',
    host:  config.get<string>('DB_HOST'),
    port:  config.get<number>('DB_PORT'),
    username: config.get<string>('DB_USER'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_NAME'),
    synchronize: false,
}

export const dataSourceOptions: DataSourceOptions = {
    ...ormconfig,
    entities: ["dist/modules/**/entities/*.entity{.ts,.js}"],
    migrations: ["./src/migrations/*{.ts,.js}"],
    
}

export default new DataSource(dataSourceOptions)