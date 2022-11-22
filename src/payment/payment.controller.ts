import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditPaymentDto, CreatePaymentDto } from './dtos';
import { Auth } from 'src/common/decorators';
import { PaymentService } from './payment.service';
import { CreatePaymentconceptDto } from 'src/payment-concept/dtos';

@ApiTags('Payment')
@Controller('payments')
export class PaymentController {

    constructor(private readonly paymentService:PaymentService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.paymentService.getMany();
       return {
           message:"pagos cargados con éxito!",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.paymentService.getOne(id);
       return {
           message:"pago cargado con exitó!",
           data:data
       }
    }

    // @Auth()
    // @Post(':id')
    // async createOne(@Body()dto:CreatePaymentDto,
    //     @Body("paymentConcepts")dtoPaymentConcept:[CreatePaymentconceptDto],
    //     @Param('id') id:number,){
    //    const data= await this.paymentService.createOne(dto, id);
    //    return {
    //        message:"Formulario del pago cargado",
    //        data:data
    //    }
    // }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditPaymentDto){
       const data= await this.paymentService.editOne(id,dto);
       return {
           message:"Formulario del pago cargado",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.paymentService.deleteOne(id);
    }
    @Get('/users/:id')
    async getPaymentAndUserById(@Param('id') id:number)
    {
        const data= await this.paymentService.getPaymentAndUserById(id);
        return {
            message:"Pago cargada",
            data:data
        }
        
    }

    getAmount(arr, name) {
        for (let index = 0; index < arr.length; index++) {
            if (arr[index].name === name) {
                return arr[index].amount
            }
        }
        return 0
    }


    @Get('/generateCSV/:id')    
    async getDownload(@Param('id') id: number, @Res() res:any){
        const data_payments = await this.paymentService.getMany()
        const payment_list = [["RECIBO","FECHA","NOMBRE","CONCEPTO","CAMISETA","CAMPAMENTO","CARNE","CURSOS","EXCURSION","INSCRIPC.","INSIGNIAS","MENSUALIDAD","UNIFORME","PANOLETAS","PLAN ADEL.","NOCTURNA","OTROS","TOTAL"]]
        data_payments.forEach(payment => {
            payment_list.push
            ([
                payment.receiptNumber, payment.date.toDateString(), payment.user.name, payment.observation, this.getAmount(payment.paymentConcepts,"CAMISETA"), this.getAmount(payment.paymentConcepts,"CAMPAMENTO"),
                this.getAmount(payment.paymentConcepts,"CARNE"), this.getAmount(payment.paymentConcepts,"CURSOS"), this.getAmount(payment.paymentConcepts,"EXCURSION"), this.getAmount(payment.paymentConcepts,"INSCRIPC."),
                this.getAmount(payment.paymentConcepts,"INSIGNIAS"),this.getAmount(payment.paymentConcepts,"MENSUALIDAD"),this.getAmount(payment.paymentConcepts,"UNIFORME"),this.getAmount(payment.paymentConcepts,"PANOLETAS"),
                this.getAmount(payment.paymentConcepts,"PLAN ADEL."),this.getAmount(payment.paymentConcepts,"NOCTURNA"),this.getAmount(payment.paymentConcepts,"OTROS"), payment.amount       
            ])
        })

        const fs = require('fs');  
        const csv = require ('fast-csv');

        const csvStream = csv.format({headers:true, delimiter:';'});
        let chunks = [];
        csvStream.on('end', () => {
            res.setHeader('Content-disposition', `attachment; filename=pagos-${new Date().toISOString().split('T')[0]}.csv`);
            res.contentType("text/csv");
            res.send(Buffer.concat(chunks));
        }).on('error', error => console.error(error)).on('data', row => chunks.push(row));

        payment_list.forEach(value => {
            csvStream.write(value);
        })
        csvStream.end()

    } 
  
}