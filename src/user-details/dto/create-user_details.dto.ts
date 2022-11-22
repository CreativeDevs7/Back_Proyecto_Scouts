import { IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Max, MaxLength} from "class-validator";

export class CreateUserDetailsDto {

    @IsString()
    @MaxLength(15)
    homePlace:string;

    @IsString()
    @MaxLength(1)
    sex:string;
    
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(300)
    weight:number;

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(300)
    stature:number;


    @IsNumberString()
    @MaxLength(15)
    phoneUser:string;

    @IsString()
    @MaxLength(50)
    institute:string;

    @IsString()
    @MaxLength(10)
    timeShift:string;

    @IsString()
    @MaxLength(15)
    currentCourse:string;

    @IsOptional()
    @IsString()
    @MaxLength(1)
    calendary:string;

    @IsString()
    @MaxLength(2)
    bloodType:string;

    @IsString()
    @MaxLength(8)
    rh:string;
    
    @IsString()
    @MaxLength(40)
    eps:string;
    

    @IsString()
    @MaxLength(30)
    entryBranch:string;

    @IsString()
    @MaxLength(30)
    receivingBoss:string;

    @IsString()
    @MaxLength(250)
    recommended:string;
    
    @IsNumber()
    @IsOptional()
    carne:number;
    
}