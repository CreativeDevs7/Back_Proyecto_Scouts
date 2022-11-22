import { Column,Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('signs')
export class ResponsibleSign extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"name",type:"varchar", length:"30"})
    nameResponsibleSign!:string;
    @Column({name:"phone",type:"varchar", length:"10"})
    phoneResponsible!:string;
    @CreateDateColumn({name:"sign_date",type:"timestamp"})
    signDate!:Date;


}