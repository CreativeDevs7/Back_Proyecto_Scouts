import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentConcept } from './entities';
import { CreatePaymentconceptDto, EditPaymentconceptDto } from './dtos';

@Injectable()
export class PaymentConceptService {

    
constructor(
    @InjectRepository(PaymentConcept)
    private readonly paymentconceptRepository:Repository<PaymentConcept>
){}

async getMany():Promise<PaymentConcept[]>{
    return await this.paymentconceptRepository.find(); 
}

async getOne(id:number){
    const paymentconcep= await this.paymentconceptRepository.findOneBy({id:id});
    if(!paymentconcep) throw new NotFoundException();
    return paymentconcep; 
}

async createOne(dto:CreatePaymentconceptDto){
    const paymentconcept= await this.paymentconceptRepository.create(dto);
    return await this.paymentconceptRepository.save(paymentconcept);  
}

async editOne(id:number, dto:EditPaymentconceptDto){
    const paymentconcep = await this.paymentconceptRepository.findOneBy({id:id});
    if(!paymentconcep) throw new NotFoundException('El concepto de pago no existe')
    const editedPaymentconcep= await this.paymentconceptRepository.update({id},dto);
    return editedPaymentconcep;
}

async deleteOne(id:number){
    const paymentconcep = await this.paymentconceptRepository.findOneBy({id:id});
    if(!paymentconcep) throw new NotFoundException();
    return await this.paymentconceptRepository.remove(paymentconcep);
}
async findByPayment(id:number){    
    return await this.paymentconceptRepository
    .createQueryBuilder("paymentConcepts")
    .leftJoinAndSelect('paymentConcepts.payments', 'payment')
     .where('paymentsId = :id', { id })
    .getOne()
}
async getPaymentConceptAndUserById(id:number){    
    return await this.paymentconceptRepository
    .createQueryBuilder("paymentconcepts")
    .leftJoinAndSelect('paymentconcepts.users', 'user')
    .where('paymentconceptsId = :id', { id }) 
    .getMany()
}
//async findByPersonal(id:number){    
   // return await this.paymentconceptRepository
    //.createQueryBuilder("paymentConcepts")
    //.leftJoinAndSelect('paymentConcepts.personals', 'personal')
     //.where('personalsId = :id', { id })
    //.getOne()
}

//}