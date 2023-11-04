import { DataSource } from "typeorm";
import { ormconfig } from "./typeorm.config";



export const source = new DataSource({...ormconfig, entities: ["dist/modules/**/entities/*.entity{.ts,.js}"]})