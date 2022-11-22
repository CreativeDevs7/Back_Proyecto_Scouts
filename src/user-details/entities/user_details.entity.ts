import { Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity('userdetails')
export class UserDetails extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn({name:"birth_date",type:"timestamp"})
    birthDate!:Date;
    @Column({name:"home_place",type:"varchar", length:"20", nullable: false})
    homePlace!:string;
    @Column({name:"sex",type:"varchar", length:"1", nullable: false})
    sex!:string;
    @Column({name:"weight", type:"integer", precision:3, nullable: true})
    weight!:number;
    @Column({name:"stature",type:"integer", precision:4, nullable: true})
    stature!:number;
    @Column({name:"phone",type:"varchar", length:15, nullable: false})
    phoneUser!:string;
    @Column({name:"institute",type:"varchar", length:"50", nullable: false})
    institute!:string;
    @Column({name:"time_shift",type:"varchar", length:"10"})
    timeShift!:string;
    @Column({name:"current_course",type:"varchar", length:"15", nullable: false})
    currentCourse!:string;
    @Column({type:"varchar", length:"1", default:null, nullable: true})
    calendary!:string;
    @Column({name:"blood_type",type:"varchar", length:"2"})
    bloodType!:string;
    @Column({type:"varchar", length:"8",})
    rh!:string;
    @Column({name:"eps",type:"varchar", length:"40"})
    eps!:string;
    @CreateDateColumn({name:"entry_date",type:"timestamp"})
    entryDate!:Date;
    @Column({name:"entry_branch",type:"varchar", length:"30", select:false})
    entryBranch!:string;
    @Column({name:"receiving_boss",type:"varchar", length:"30", select:false})
    receivingBoss!:string;
    @Column({name:"recommended",type:"varchar", length:"250", select:false})
    recommended!:string;
    @Column({name:"carné", default:0})
    carne!:number;

    

}