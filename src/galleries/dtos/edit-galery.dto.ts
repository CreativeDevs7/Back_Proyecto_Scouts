import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateGaleryDto } from "./create-galery.dto";

export class EditGaleryDto extends PartialType(CreateGaleryDto){}