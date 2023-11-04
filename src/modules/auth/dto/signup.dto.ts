import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";


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

    @IsString()
    @IsOptional()
    address: string;

    @IsDateString()
    @IsOptional()
    dob: string;
}


export class SigninWithGoogleDto {
    @IsString()
    @IsNotEmpty()
    credential: string;

    @IsString()
    @IsOptional()
    clientId: string;

    @IsString()
    @IsOptional()
    select_by: string;
}

export class SignupWithGoogleDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    username: string;

    @IsString()
    @IsOptional()
    address: string;

    @IsDateString()
    @IsOptional()
    dob: string;

    // @IsBoolean()
    // @IsOptional()
    // isTwoFA: boolean;
}