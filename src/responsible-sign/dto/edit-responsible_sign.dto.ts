import { PartialType } from "@nestjs/mapped-types";
import {CreateResponsibleSignDto } from "./create-responsible_sign.dto";
export class EditResponsibleSignDto extends PartialType(CreateResponsibleSignDto){}
