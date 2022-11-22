import {  IsString, MaxLength } from "class-validator";

export class CreateGaleryDto {

    @IsString()
    @MaxLength(100)
    fieldname!:string;

    @IsString()
    @MaxLength(100)
    originalname!: string;
    
    @IsString()
    @MaxLength(100)
    encoding!: string;
    
    @IsString()
    @MaxLength(100)
    mimetype!: string;

    @IsString()
    @MaxLength(100)
    destination!: string;

    @IsString()
    @MaxLength(100)
    filename!: string;

    @IsString()
    @MaxLength(100)
    path!:string;

    @IsString()
    @MaxLength(100)
    size!: number;  


}