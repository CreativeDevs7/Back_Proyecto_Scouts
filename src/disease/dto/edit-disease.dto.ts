import { PartialType } from "@nestjs/mapped-types";
import {CreateDiseaseDto } from "./create-disease.dto";
export class EditDiseaseDto extends PartialType(CreateDiseaseDto){}
