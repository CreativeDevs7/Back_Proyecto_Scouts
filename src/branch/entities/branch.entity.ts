import { Advance } from "src/advance/entities";
import { User } from "src/user/entities";
import { Column,Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity('branches')
export class Branch{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:"name_branch",type:"varchar", length:"30", nullable: false})
    nameBranch!:string; 

    @OneToMany(type=> Advance, advance => advance.branches,{cascade:true})
    advances: Advance[];

    @OneToMany(type => User, user => user.branches,)
    users: User[];

    // @OneToOne(type => User,
    //     {
    //         cascade: true, 
    //         // nullable:false, 
    //         // eager:true, 
    //     })
    // @JoinColumn()
    // user:User;
}