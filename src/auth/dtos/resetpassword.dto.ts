import { IsString, MaxLength, MinLength, minLength } from "class-validator";

export class ResetPasswordDto{
 
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    password:string;
}