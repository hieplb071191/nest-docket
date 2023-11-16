import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    province: string;

    @IsString()
    @IsNotEmpty()
    district: string;

    @IsString()
    @IsNotEmpty()
    ward: string;

    @IsString()
    @IsNotEmpty()
    specifically: string;

    @IsLatitude()
    @IsNotEmpty()
    lat: string;

    @IsLongitude()
    @IsNotEmpty()
    long: string;

}