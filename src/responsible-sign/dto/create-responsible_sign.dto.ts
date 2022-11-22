import { Type } from "class-transformer";
import { IsDate, IsDateString, IsString, MaxLength } from "class-validator";

export class CreateResponsibleSignDto {

    @MaxLength(30)
    @IsString()
    nameResponsibleSign:string;
    
    @MaxLength(10)
    @IsString()
    phoneResponsible:string;
}