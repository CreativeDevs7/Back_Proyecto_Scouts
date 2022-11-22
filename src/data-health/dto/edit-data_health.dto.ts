import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateDatahealthDto } from "./create-data_health.dto";

export class EditDatahealthDto extends PartialType(CreateDatahealthDto){}