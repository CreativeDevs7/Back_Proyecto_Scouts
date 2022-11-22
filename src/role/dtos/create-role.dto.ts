import { IsString, MaxLength } from "class-validator";


export class CreateRoleDto {

    @MaxLength(30)
    @IsString()
    name:string;
}