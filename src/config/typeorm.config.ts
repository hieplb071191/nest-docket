import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });
import { ConfigService } from '@nestjs/config';
const config = new ConfigService()

export const ormconfig: DataSourceOptions = {
    type: 'mysql',
    host:  `${process.env.DB_HOST}`,
    port:  parseInt(process.env.DB_PORT),
    username: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    synchronize: false,
}

export const dataSourceOptions: DataSourceOptions = {
    ...ormconfig,
    entities: ["dist/modules/**/entities/*.entity{.ts,.js}"],
    migrations: ["./src/migrations/*{.ts,.js}"],
    
}


const dataSource = new DataSource(dataSourceOptions)
export default dataSource