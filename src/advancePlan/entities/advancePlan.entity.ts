import { Advance } from "src/advance/entities";
import { User } from "src/user/entities";
import {  Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from "typeorm";

@Entity('advance_plans')
export class AdvancePlan{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"update_date",type:"timestamp"})
    updateDate!:Date;

    @OneToMany(type=> Advance, advance => advance.advancesPlan,{cascade:true, eager:true})
    advances: Advance[];

    @OneToOne(type => User, 
        {
            cascade: true, 
            // nullable:false, 
            eager:true,
        })
    @JoinColumn()
    user:User;

}
