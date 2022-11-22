import {  Column, Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";

    @Entity('galleries')
    export class Gallery{
    @PrimaryGeneratedColumn()
    id:number;    
    @Column({name:"field_name",type:"varchar",length:"100"})
    fieldname!:string;
    @Column({name:"original_name",type:"varchar",length:"100"})
    originalname!: string;
    @Column({name:"encoding",type:"varchar",length:"100"})
    encoding!: string;
    @Column({name:"mimetype",type:"varchar",length:"100"})
    mimetype!: string;
    @Column({name:"destination",type:"varchar",length:"100"})
    destination!: string;
    @Column({name:"file_name",type:"varchar",length:"100"})
    filename!: string;
    @Column({name:"path",type:"varchar",length:"100"})
    path!:string;
    @Column({name:"size",type:"varchar",length:"100"})
    size!: number;    

}