import { Permission } from "src/permission/entities";
import { User } from "src/user/entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({name:"name",type:"varchar", length:"30"})
    name!:string;

    @OneToMany(type => Permission,permission => permission.role ,{nullable:true})
    permission!:Permission[];

    @OneToMany(type => User, user => user.roles)
    users: User[];

    // @OneToMany(type => Personal, personal => personal.roles,)
    // personals: Personal[];

    
}
