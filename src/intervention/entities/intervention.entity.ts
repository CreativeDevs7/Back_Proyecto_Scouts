import { Column,Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { DataHealth } from "../../data-health/entities";

@Entity('interventions')
export class Intervention{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"typeIntervention",type:"varchar", length:"15", nullable:false})
    typeIntervention!:string;
    @Column({name:"which_intervention",type:"varchar", length:"50", nullable:true})
    whichIntervention!:string;
    
    @ManyToOne(type=>DataHealth, datahealth => datahealth.interventions,{onDelete:"CASCADE"})
    datahealth: DataHealth;

}