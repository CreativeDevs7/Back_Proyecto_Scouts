import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Role } from "nest-access-control";


export class CreatePermissionDto {

    @MaxLength(30)
    @IsString()
    name:string;

    @MaxLength(30)
    @IsString()
    authorization!:string;

    @IsNotEmpty()
    @IsArray()
    role:Role[];
}