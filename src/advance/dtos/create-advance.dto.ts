import {  IsArray, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { AdvancePlan } from "src/advancePlan/entities";
import { Branch } from "src/branch/entities";

export class CreateAdvanceDto {

    @IsString()
    @MaxLength(50)
    name:string;

    @IsOptional()
    @IsString()
    createDate:Date;

    @IsString()
    @MaxLength(60)
    leader:string;
    
    @IsString()
    @MaxLength(250)
    description:string;

    @IsNotEmpty()
    @IsOptional()
    advancePlan:AdvancePlan;

}
