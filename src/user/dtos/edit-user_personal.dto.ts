import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { CreateUserPersonalDto } from "./create-user_personal.dto";

export class EditUserPersonalDto extends PartialType(CreateUserPersonalDto){}
