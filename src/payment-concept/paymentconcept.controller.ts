import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditPaymentconceptDto, CreatePaymentconceptDto } from './dtos';
import { Auth } from 'src/common/decorators';
import { PaymentConceptService } from './paymentconcept.service';
import { CreatePaymentDto } from 'src/payment/dtos';
import { PaymentService } from 'src/payment/payment.service';



@ApiTags('PaymentConcept')
@Controller('paymentconcepts')
export class PaymentConceptController {

    constructor(
        private readonly paymentConceptService:PaymentConceptService,
       
        
        ){}

    @Auth()
    @Get()
    async getMany(

    //@Body()dto:CreatePaymentconceptDto,
    //@Body("payment")dtoPayment:CreatePaymentconceptDto,


    ){
       const data= await this.paymentConceptService.getMany();
       return {
           message:"Formulario del concepto de pago cargado",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(
        
@Param('id', ParseIntPipe) id:number,
//@Body()dto:CreatePaymentconceptDto,
//@Body("payment")dtoPayment:CreatePaymentconceptDto,
        ){
       const data= await this.paymentConceptService.getOne(id);
       return {
           message:"Formulario del concepto de pago cargado",
           data:data
       }
    }
    @Auth()
    @Get('/payments/:id')
    async get(@Param('id') id:number){
        const data= await this.paymentConceptService.findByPayment(id);
         //await this.paymentConceptService.findByPersonal(id);
        return {
            message:"Concepto pago usuario cargado",
            data:data
    }
}

    @Auth()
    @Post()
    async createOne(
@Body()dto:CreatePaymentconceptDto,

        ){
       const data= await this.paymentConceptService.createOne(dto);
       return  {
           message:"Formulario del concepto de pago cargado",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditPaymentconceptDto){
       const data= await this.paymentConceptService.editOne(id,dto);
       return {
           message:"Formulario del concepto de pago cargado",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.paymentConceptService.deleteOne(id);
    }

}