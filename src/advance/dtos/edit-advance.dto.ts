import { PartialType } from "@nestjs/mapped-types";
import { CreateAdvanceDto } from "./create-advance.dto";

export class EditAdvanceDto extends PartialType(CreateAdvanceDto){}
