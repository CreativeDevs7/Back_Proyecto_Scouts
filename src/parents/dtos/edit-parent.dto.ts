import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateParentDto } from "./create-parent.dto";

export class EditParentDto extends PartialType(CreateParentDto){}
