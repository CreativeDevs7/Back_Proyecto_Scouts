import { PartialType } from "@nestjs/mapped-types";
import {CreateInterventionDto } from "./create-intervention.dto";
export class EditInterventionDto extends PartialType(CreateInterventionDto){}
