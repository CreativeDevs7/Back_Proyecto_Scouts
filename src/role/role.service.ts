import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto, EditRoleDto } from './dtos';
import {  Role } from './entities';

@Injectable()
export class RoleService {

    
constructor(
    @InjectRepository(Role)
    private readonly roleRepository:Repository<Role>
){}

async getMany():Promise<Role[]>{
    return await this.roleRepository.find(); 
}

async getOne(id:number){
    const role= await this.roleRepository.findOneBy({id:id});
    if(!role) throw new NotFoundException();
    return role; 
}

async createOne(dto:CreateRoleDto){
    const role= await this.roleRepository.create(dto as any);
    return await this.roleRepository.save(role);
}

async editOne(id:number, dto:EditRoleDto){
    const role = await this.roleRepository.findOneBy({id:id});
    if(!role) throw new NotFoundException('No existe un Rol')
    const editedRole= Object.assign(role,dto);
    return await this.roleRepository.save(editedRole);
}

async deleteOne(id:number){
    const role = await this.roleRepository.findOneBy({id:id});
    return await this.roleRepository.remove(role);
}

}
