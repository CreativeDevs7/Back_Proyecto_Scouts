import { Role } from "src/role/entities";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permission{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"type_request",type:"varchar",  length:"60"})
    typeRequest!:string;

    @Column({name:"path",type:"varchar",  length:"60"})
    path!:string;

    @Column({name:"permission",type:"varchar", length:"60"})
    permission!:string;

    @Column({name:"authorization",type:"varchar", length:"60"})
    authorization!:string;
    
    @ManyToOne(type => Role, role => role.permission ,{nullable:true})
    role!:Role;
}
