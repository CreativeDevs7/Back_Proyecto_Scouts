import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreatePaymentconceptDto } from "./create-payment_concept.dto";

export class EditPaymentconceptDto extends PartialType(CreatePaymentconceptDto){}