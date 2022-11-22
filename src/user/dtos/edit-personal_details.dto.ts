import { PartialType } from "@nestjs/mapped-types";
import { CreateUserPersonalDto } from "./create-user_personal.dto";

export class EditPersonalDetailsDto extends PartialType(CreateUserPersonalDto){}
