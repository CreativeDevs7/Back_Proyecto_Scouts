import { IsString, MaxLength, IsNumber, IsNotEmpty, IsArray, IsOptional } from "class-validator";
import { Advance } from "src/advance/entities";

export class CreateBranchDto {


    @MaxLength(30)
    @IsString()
    @IsOptional()
    nameBranch:string;
    
    // @IsNotEmpty()
    // @IsArray()
    // advances:Advance[];
}



