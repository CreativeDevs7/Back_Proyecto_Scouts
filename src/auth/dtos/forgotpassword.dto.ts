import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class ForgotPasswordDto{
    @ApiProperty()
    @IsString()
    email:string;
}