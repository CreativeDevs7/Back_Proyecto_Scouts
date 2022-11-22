import { IsArray, IsBoolean, IsNotEmpty, IsObject, IsOptional, IsString, MaxLength } from "class-validator";
import { Disease } from "../../disease/entities";
import { Intervention } from "../../intervention/entities";

export class CreateDatahealthDto {

    @IsBoolean()
    allergies:boolean;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    noteAllergies:string;

    @IsBoolean()
    disease:boolean;
    
    @IsOptional()
    @IsString()
    @MaxLength(100)
    noteDiseases:string;

    @IsBoolean()
    medicine:boolean;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    doseTime:string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    specification:string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    noteMedicine:string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    healthSecure:string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    cardNumber:string;

    // @IsString()
    // @MaxLength(15)
    // @IsOptional()
    // secureTelephone:string;

    @IsOptional()
    @IsString()
    @MaxLength(60)
    privateDoctor:string;

    @IsString()
    @MaxLength(20)
    @IsOptional()
    doctorTelephone:string;

    @IsString()
    @MaxLength(60)
    nameOneEmergency:string;

    @IsString()
    @MaxLength(20)
    telephoneOneEmergency:string;

    @IsOptional()
    @IsString()
    @MaxLength(60)
    nameTwoEmergency:string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    telephoneTwoEmergency:string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    observations:string;

    @IsNotEmpty()
    @IsArray()
    diseases:Disease[];

    @IsNotEmpty()
    @IsArray()
    interventions:Intervention[];

}