import { hash } from "bcryptjs";
import { DataHealth } from "../../data-health/entities";
import { Parent } from "../../parents/entities";
import { ResponsibleSign } from "../../responsible-sign/entities";
import { UserDetails } from "../../user-details/entities";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gallery } from "../../galleries/entities";
import { Payment } from "src/payment/entities";
import { Branch } from "src/branch/entities";
import { AdvancePlan } from "src/advancePlan/entities";
import { NotFoundException } from "@nestjs/common";
import { Role } from "src/role/entities";
import { PersonalDetails } from "src/personal-details/entities";

@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"name",type:"varchar", length:"30"})
    name!:string;
    @Column({name:"last_name",type:"varchar", length:"30"})
    lastName!:string;
    @Column({type:"varchar", length:"30", nullable: false})
    email!:string;
    @Column({type:"varchar", length:"128", nullable:false, select:false})
    password!:string;
    @Column({name:"document_type",type:"varchar", length:"15", nullable: false})
    documentType!:string;
    @Column({name:"document",type:"varchar", length:"20", nullable: false})
    document!:string;
    @CreateDateColumn({name:"birth_date",type:"timestamp"})
    birthDate!:Date;
    @CreateDateColumn({name:"create_date",type:"timestamp"})
    createDate!:Date;
    @Column({type:"bool", default:false})
    status!:boolean;
    @Column({name:"home_address",type:"varchar", length:"40", nullable: false})
    homeAddress!:string;
    @Column({name:"attention_site",type:"varchar", length:"50", nullable: true})
    attentionSite!:string;

    @OneToMany(type=> Parent, parent => parent.user,{cascade:true, onDelete:"CASCADE"})
    parents: Parent[];

    @OneToMany(type=> Payment, payment => payment.user,{cascade:true})
    payments: Payment[];

    @ManyToOne(type => Branch, branch => branch.users ,{nullable:true, eager:true})
    branches: Branch;

    @ManyToOne(type => Role, role => role.users ,{nullable:true})
    roles: Role;
   
    @OneToOne(type => Gallery,
        {
            cascade:true, onDelete:"CASCADE",
            // nullable:false
            // eager:true, 
        })
    @JoinColumn()
    profileImage:Gallery;
    
    @OneToOne(type =>PersonalDetails,
        {
            cascade:true, onDelete:"CASCADE",
            // nullable:false, 
             eager:true, 
        })
    @JoinColumn()
    personalDetails:PersonalDetails;
    
    @OneToOne(type => ResponsibleSign,
        {
            cascade:true, onDelete:"CASCADE",
            // nullable:false, 
            // eager:true, 
        })
    @JoinColumn()
    responsibleSign:ResponsibleSign;
    
    @OneToOne(type => UserDetails,
        {
            cascade:true, onDelete:"CASCADE",
            // nullable:false, 
            // eager:true, 
        })
    @JoinColumn()
    userDetails:UserDetails;

   
    @OneToOne(type => DataHealth,
        {
            cascade:true, onDelete:"CASCADE",
            // nullable:false, 
            // eager:true, 
        })
    @JoinColumn()
    dataHealth:DataHealth;

   @BeforeInsert()
   async branchDefault(){
       this.status=false;
       if(!this.branches){
           this.branches = new Branch()
           this.branches.id=1;
       }
   }

    @BeforeInsert()
    @BeforeUpdate()
    async setRole(){
        if(!this.roles){
            this.roles = new Role()
            this.roles.id=1;
        }
       
    
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if (!this.password){
            return;
        } 
        this.password=await hash(this.password,10);
    }

    

}
