import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Gallery } from "../../galleries/entities";
import { DataHealth } from "../../data-health/entities";
import { Parent } from "../../parents/entities";
import { ResponsibleSign } from "../../responsible-sign/entities";
import { UserDetails } from "../../user-details/entities";
import { Payment } from "src/payment/entities";
import { Branch } from "src/branch/entities";
import { AdvancePlan } from "src/advancePlan/entities";
import { AppRoles } from "src/app.roles";
import { EnumToString } from "src/common/helpers/enumToString";
import { PersonalDetails } from "src/personal-details/entities";

export class CreateUserPersonalDto {

    @MaxLength(50)
    @IsString()
    name:string;
    
    @IsString()
    @MaxLength(50)
    lastName:string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    email:string;

    @IsString()
    @MaxLength(20)
    @MinLength(8)
    @IsOptional()
    password:string;

    @IsString()
    @MaxLength(15)
    documentType:string;
    
    @IsString()
    @MaxLength(20)
    document:string;
    
    @IsString()
    birthDate:Date;
   
    @IsOptional()
    @IsBoolean()
    status:boolean;
    
    @IsNotEmpty()
    @IsObject()
    personalDetails:PersonalDetails;
    
    @IsString()
    @MaxLength(200)
    homeAddress:string;
    
    @IsOptional()
    @IsString()
    @MaxLength(50)
    attentionSite:string;


    @IsObject()
    @IsNotEmpty()
    @IsOptional()
    branches:Branch;

}
