import { IsArray, IsBoolean, IsDate, isNotEmpty, IsNotEmpty, IsNumber, isNumber, isObject, IsObject, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Gallery } from "src/galleries/entities";
import { PaymentConcept } from "src/payment-concept/entities";

export class CreatePaymentDto {

    @IsNumber()
    amount:number;

    @IsString()
    @MaxLength(20)
    receiptNumber:string;

    @IsString()
    date:Date;

    @IsString()
    @MaxLength(255)
    observation:string;

    @IsNotEmpty()
    @IsArray()
    paymentConcepts:PaymentConcept[];

}