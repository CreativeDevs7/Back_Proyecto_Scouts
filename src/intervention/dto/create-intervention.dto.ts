import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateInterventionDto {

    @MaxLength(15)
    @IsString()
    typeIntervention:string;
    
    @IsOptional()
    @MaxLength(50)
    @IsString()
    whichIntervention:string;

    

}
