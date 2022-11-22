import { Payment } from "src/payment/entities";
// import { Personal } from "src/personal/entities";
import {  Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, 
    OneToOne, JoinColumn } from "typeorm";

@Entity('payment_concepts')
            export class PaymentConcept extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column({name:"name",type:"varchar"})
    name!: string;
    @Column({ name: "amount", type: "double" })
    amount!:number;

    @ManyToOne(type => Payment, payment => payment.paymentConcepts,{onDelete:"CASCADE"})
    payments: Payment;

   
}