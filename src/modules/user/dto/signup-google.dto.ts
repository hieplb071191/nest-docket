import { Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class AddressUserDto {
    @IsNumber()
    @IsNotEmpty()
    lat: number

    @IsNumber()
    @IsNotEmpty()
    lng: number
}

export class SignUpWithGoogleDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsDateString()
    dob: string;

    @IsOptional()
    @Type(() => AddressUserDto)
    address: AddressUserDto


    @IsBoolean()
    @IsOptional()
    isTwoFA: boolean
}