import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { Transform, Type } from "class-transformer";

export class AddressDto {

    @IsNotEmpty()
    lat: any

    @IsNumber()
    @IsNotEmpty()
    long: any

    @IsString()
    @IsNotEmpty()
    specifically: string;

}


export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @Transform(type => AddressDto)
    address: AddressDto;

    @IsString()
    @IsOptional()
    dob: string;
}


export class SigninWithGoogleDto {
    @IsString()
    @IsOptional()
    credential: string;

    @IsString()
    @IsOptional()
    clientId: string;

    @IsString()
    @IsOptional()
    select_by: string;

    @IsString()
    @IsOptional()
    access_token: string;

}





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

    @IsOptional()
    @Transform(({obj}) => {
        if (obj['isTwoFA'] === 'false' || obj['isTwoFA'] === false ) {
            obj['isTwoFA'] = false
        } else if (obj['isTwoFA'] === 'true' || obj['isTwoFA'] === true ) {
            obj['isTwoFA'] = true
        } else {
            obj['isTwoFA'] = false
        }
    }
    )
    isTwoFA: boolean
}