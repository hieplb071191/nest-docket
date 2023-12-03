import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class ProductCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID('4')
    @IsNotEmpty()
    categoryId: string;

    @IsUUID('4')
    @IsNotEmpty()
    branchId: string;
}