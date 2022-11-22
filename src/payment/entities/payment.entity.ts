import { Gallery } from "src/galleries/entities";
import { PaymentConcept } from "src/payment-concept/entities";
// import { Personal } from "src/personal/entities";

import { User } from "src/user/entities";
import { Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";

@Entity('payments')
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "amount", type: "double"})
    amount!:number;
    @Column({name: "receipt_number", type: "varchar", length: "20"})
    receiptNumber:string;
    @CreateDateColumn({ name: "date", type: "timestamp" })
    date!: Date;
    @Column({ name: "observation", type: "varchar", length: "255" })
    observation!: string;

    @Column({ name: "in_charge", type: "int" })
    inCharge!: number;

    @ManyToOne(type => User, user => user.payments, {eager:true})
    user: User;

    @OneToMany(type=> PaymentConcept, paymentconcept => paymentconcept.payments,{cascade:true, eager:true})
    paymentConcepts: PaymentConcept[];

    // @ManyToOne(type => Personal ,personal => personal.payments,)
    // personals:Personal;

    
}