import { PartialType } from "@nestjs/mapped-types";
import { CreateAdvancePlanDto } from "./create-advancePlan.dto";

export class EditAdvancePlanDto extends PartialType(CreateAdvancePlanDto){}
