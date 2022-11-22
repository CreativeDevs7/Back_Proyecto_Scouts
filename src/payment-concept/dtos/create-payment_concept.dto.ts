import { IsBoolean, IsDate, isNotEmpty, IsNotEmpty, IsNumber, isNumber, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePaymentconceptDto {


    @IsString()
    name:string;

    @IsNumber()
    amount:number;


}