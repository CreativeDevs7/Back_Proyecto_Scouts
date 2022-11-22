import { IsBoolean, IsNotEmpty, IsNumber,  IsString, MaxLength, MinLength } from "class-validator";

export class CreatePersonalDetailsDto {

    @IsString()
    @MaxLength(10)
    phone:string;
    
    @IsString()
    @MaxLength(25)
    level:string;

    @IsString()
    @MaxLength(25)
    charge:string;
    
    @IsString()
    @MaxLength(2)
    bloodType:string;

    @IsString()
    @MaxLength(40)
    eps:string;

    @IsString()
    @MaxLength(8)
    rh:string;
    
   
}