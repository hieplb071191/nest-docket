import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateCategory {
    @IsString()
    @IsNotEmpty()
    title: string;
}