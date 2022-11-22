import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDetailsDto } from "./create-user_details.dto";

export class EditUserDetailsDto extends PartialType(CreateUserDetailsDto){}