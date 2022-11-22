import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto{
    @IsString()
    document:string;
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    password:string;
}