import { Column,Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { DataHealth } from "../../data-health/entities";

@Entity('diseases')
export class Disease{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"type",type:"varchar", length:"15"})
    nameDisease!:string;
    @Column({name:"which_disease",type:"varchar", length:"50", nullable: true})
    whichDisease!:string;
    
    @ManyToOne(type=>DataHealth, datahealth => datahealth.diseases,{onDelete:"CASCADE"})
    datahealth: DataHealth;
    


}