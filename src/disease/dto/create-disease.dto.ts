import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateDiseaseDto {

    @MaxLength(15)
    @IsString()
    nameDisease:string;
    
    @IsOptional()
    @MaxLength(50)
    @IsString()
    whichDisease:string;

    

}
