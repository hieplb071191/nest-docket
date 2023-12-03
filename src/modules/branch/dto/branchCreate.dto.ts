import { IsNotEmpty, IsString } from "class-validator";

export class BranchCreateDto {
    @IsString()
    @IsNotEmpty()
    title: string;
}