import { IsBoolean, IsDate, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "src/user/entities";

export class CreatePaymentDto {

    @IsString()
    @MaxLength(20)
    amount:string;

    @IsString()
    date:Date;

    @IsString()
    @MaxLength(100)
    observation:string;
   
    @IsOptional()
    @IsBoolean()
    periodic:boolean;

    @IsOptional()
    @IsBoolean()
    paid:boolean;
    
  

}