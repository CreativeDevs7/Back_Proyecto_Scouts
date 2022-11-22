import { PartialType } from "@nestjs/mapped-types";
import {CreatePersonalDetailsDto } from "./create-personal_details.dto";
export class EditPersonalDetailsDto extends PartialType(CreatePersonalDetailsDto){}
