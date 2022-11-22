
import {  Column, CreateDateColumn, Entity, BaseEntity, PrimaryGeneratedColumn, JoinColumn, OneToMany, BeforeUpdate } from "typeorm";
import { Disease } from "../../disease/entities";
import { Intervention } from "../../intervention/entities";

@Entity('data_healths')
            export class DataHealth extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @CreateDateColumn({name:"date_creation",type:"timestamp"})
    creationDate!:Date;
    @Column({name:"allergies",type:"bool", default:false})
    allergies!:boolean;
    @Column({name:"note_allergies",type:"varchar", length:"100"})
    noteAllergies!:string;
    @Column({name:"disease",type:"bool", default:false})
    disease!:boolean;
    @Column({name:"note_diseases",type:"varchar", length:"100"})
    noteDiseases!:string;
    @Column({name:"medicine",type:"bool", default:false})
    medicine!:boolean;
    @Column({name:"dose_time",type:"varchar", length:"100"})
    doseTime!:string;
    @Column({name:"specification",type:"varchar", length:"100"})
    specification!:string;
    @Column({name:"note_medicine",type:"varchar", length:"200"})
    noteMedicine!:string;
    @Column({name:"health_secure",type:"varchar", length:"50"})
    healthSecure!:string;
    @Column({name:"card_number",type:"varchar", length:"20"})
    cardNumber!:string;
    // @Column({name:"secure_telephone",type:"varchar", length:"20"})
    // secureTelephone!:string;
    @Column({name:"private_doctor",type:"varchar", length:"60"})
    privateDoctor!:string;
    @Column({name:"doctor_telephone",type:"varchar", length:"20"})
    doctorTelephone!:string;
    @Column({name:"name_one_emergency",type:"varchar", length:"30"})
    nameOneEmergency!:string;
    @Column({name:"telephone_one_emergency",type:"varchar", length:"20"})
    telephoneOneEmergency!:string;
    @Column({name:"name_two_emergency",type:"varchar", length:"30"})
    nameTwoEmergency!:string;
    @Column({name:"telephone_two_emergency",type:"varchar", length:"20"})
    telephoneTwoEmergency!:string;
    @Column({name:"observations",type:"varchar", length:"200", default: null})
    observations:string;

    @OneToMany(type => Disease, disease => disease.datahealth,{cascade:true, onDelete:"CASCADE", eager:true})
    diseases: Disease[];

    @OneToMany(type => Intervention, intervention => intervention.datahealth,{cascade:true, onDelete:"CASCADE", eager:true})
    interventions: Intervention[];

    @BeforeUpdate()
    async setAlergies(){
        if(this.noteAllergies !='NINGUNA'){
        this.allergies=true;
    }else{
        this.allergies=false;
    }
        } 

        @BeforeUpdate()
    async setMedicine(){
        if(this.noteMedicine !='NINGUNA'){
        this.medicine=true;
    }else{
        this.medicine=false;
    }
        } 

        @BeforeUpdate()
        async setDiseases(){
            if(this.noteDiseases !='NINGUNA'){
            this.disease=true;
        }else{
            this.disease=false;
        }
            } 
}