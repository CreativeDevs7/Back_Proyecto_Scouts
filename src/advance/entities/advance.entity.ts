import { AdvancePlan } from "src/advancePlan/entities";
import { Branch } from "src/branch/entities";
import {  Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity('advances')
export class Advance{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"title",type:"varchar", length:"50"})
    name!:string;
    @Column({name:"create_date",type:"timestamp"})
    createDate!:Date;
    @Column({name:"leader_name",type:"varchar", length:"60"})
    leader!:string;
    @Column({name:"description",type:"varchar", length:"250"})
    description!:string;

    @ManyToOne(type=>Branch, branch => branch.advances, )
    branches: Branch;
    
    @ManyToOne(type=>AdvancePlan, advancePlan => advancePlan.id,{onDelete:"CASCADE"})
    advancesPlan: AdvancePlan;
}
