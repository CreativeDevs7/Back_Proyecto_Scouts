import { IsString, MaxLength, IsNumberString, IsOptional } from "class-validator";

export class CreateParentDto {
    
    @MaxLength(30)
    @IsString()
    @IsOptional()
    name:string;
    
    @MaxLength(30)
    @IsString()
    @IsOptional()
    lastName:string;
    
    @IsString()
    @IsOptional()
    email:string;

    @IsNumberString()
    @MaxLength(15)
    @IsOptional()
    phoneParent:string;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    relationship:string;

    @MaxLength(30)
    @IsString()
    @IsOptional()
    professional:string;

    @MaxLength(30)
    @IsString()
    @IsOptional()
    company:string;
    
    // @IsNotEmpty()
    // user:User;
  
}