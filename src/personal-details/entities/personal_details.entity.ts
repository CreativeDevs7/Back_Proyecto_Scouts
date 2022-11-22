import { User } from "src/user/entities";
import {Column,Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('personal_details')
export class PersonalDetails{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"phone",type:"varchar", length:"10", nullable: false})
    phone!:string;
    @Column({name:"level",type:"varchar", length:"25", nullable: false})
    level!:string;
    @Column({name:"charge",type:"varchar", length:"15", nullable: false})
    charge!:string;
    @Column({name:"blood_type",type:"varchar", length:"2", nullable: false})
    bloodType!:string;
    @Column({name:"eps",type:"varchar", length:"40"})
    eps!:string;
    @Column({name:"rh",type:"varchar", length:"8"})
    rh!:string;
    // @OneToOne(type => User,
    //     {
    //         cascade: true, 
    //         // nullable:false, 
    //         // eager:true, 
    //     })
    // @JoinColumn()
    // user:User;

    
}