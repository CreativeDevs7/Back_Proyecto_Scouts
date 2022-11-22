import {  IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { Advance } from "src/advance/entities";

export class CreateAdvancePlanDto {

 
    @IsString()
    updateDate:Date;

    @IsNotEmpty()
    @IsArray()
    advances:Advance[];

}
