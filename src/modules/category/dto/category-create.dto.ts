import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class CreateCategory {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    createdBy: string;

}