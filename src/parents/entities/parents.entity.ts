import { type } from "os";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities";

@Entity('parents')
export class Parent{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "name", type: "varchar", length: "40", nullable:true })
    name!: string;
    @Column({ name: "last_name", type: "varchar", length: "40", nullable:true })
    lastName!:string;
    @Column({ name: "phone", type: "varchar", length:15, nullable:true })
    phoneParent!:string;
    @Column({ name: "relationship", type: "varchar", length: "10", nullable:true })
    relationship!: string;
    @Column({ type: "varchar", length: "60", nullable:true })
    email!: string;
    @Column({ name: "professional", type: "varchar", length: "60", nullable:true })
    professional!: string;
    @Column({ name: "company", type: "varchar", length: "60", nullable:true })
    company!: string;
    @CreateDateColumn({ name: "create_date", type: "timestamp" })
    createDate: Date;
    
    @ManyToOne(type=>User, user => user.parents, { onDelete:"CASCADE"})
    user: User;

}