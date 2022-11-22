import { HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities';
import { CreatePaymentDto, EditPaymentDto } from './dtos';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {

    
constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository:Repository<Payment>,
    private readonly userService:UserService,
   
    ){}

async getMany():Promise<Payment[]>{
    return await this.paymentRepository.find(); 
}

async getOne(id:number){
    const payment= await this.paymentRepository.findOneBy({id:id});
    if(!payment) throw new NotFoundException();
    return payment; 
}

async createOne(dto:CreatePaymentDto, id:number, idUser:number){
    const user = await this.userService.getOne(id);
    // const personal = await this.personalService.getOne(id);
    // const payment= await this.paymentRepository.create({...dto, user:user, personals:personal});
    const payment= await this.paymentRepository.create({...dto, user:user, inCharge:idUser});
    return await this.paymentRepository.save(payment);
    
}

// async editOne(id:number,dto:EditPaymentDto){
//     const payment = await this.paymentRepository.findOne(id);
//     if(!payment) throw new NotFoundException('No existe una factura de pago')
//     const editedpayment= await this.paymentRepository.update({id},dto)
    
//     return editedpayment;

// }
async editOne(id:number, dto:EditPaymentDto){
    const payment = await this.paymentRepository.findOneBy({id: dto.id});
    if(!payment) throw new NotFoundException('El pago no existe')
    const editedPaymentconcep= Object.assign(payment,dto);
    return await this.paymentRepository.save(payment);
}

async deleteOne(id:number){
    const payment = await this.paymentRepository.findOneBy({id:id});
    if(!payment) throw new NotFoundException();
    return await this.paymentRepository.remove(payment);
}

async deleteOnePayment(userId:number,paymentId:number){
    const user = await this.userService.getOne(userId);

    // const payment = await this.paymentRepository.findOne(idPayment); 
    const payment = await this.paymentRepository  
    .createQueryBuilder("payments")
    .delete()
    .where("id = :paymentId", {paymentId})
    .andWhere("userId = :userId", {userId}) 
    .execute();
    
    if(payment.affected==0) throw new NotFoundException("Pago no existe");

    if(payment.affected!=0){
        return "pago eliminado con exito";
    }
}


async getPaymentAndUserById(id:number){    
    return await this.paymentRepository
    .createQueryBuilder("payments")
    .leftJoinAndSelect('payments.users', 'user')
    .where('paymentsId = :id', { id }) 
    .getMany()
}




}
