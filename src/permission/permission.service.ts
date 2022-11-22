import { Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { BranchService } from 'src/branch/branch.service';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePermissionDto, EditPermissionDto } from './dtos';
import {  Permission } from './entities';

@Injectable()
export class PermissionService {

    
constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository:Repository<Permission>,
    private readonly userService:UserService,
    private readonly branchService:BranchService
){}

async getMany():Promise<Permission[]>{
    const permission = await this.permissionRepository.find(); 
    if(!permission) throw new NotFoundException();
    return permission;
}

async getOne(id:number):Promise<Permission>{
    const permission= await this.permissionRepository.findOneBy({id:id});
    if(!permission) throw new NotFoundException();
    return permission; 
}

async getOnePermission(id:number, userId:number,userDocument:string, param:number, path:string, method:string):Promise<any>{
    let user:User;
    
    // const pathFinal = path.split('/')[2];

    // if(pathFinal=="branches"){
    //     console.log(path)
    //    const branch = await this.branchService.getBranchAndUserById(param);
       

    //    return branch
       
    // }

    if(param){
        user= await this.userService.getOne(param);
    }
    const matchPermission:Permission = await this.permissionRepository
        .createQueryBuilder("permission")
        .where('roleId = :id', { id })
        .andWhere('path = :path', { path })
        .andWhere('type_request = :method',{method})
        .getOne();
    

    if(!matchPermission) throw new UnauthorizedException("No tiene acceso a esta ruta por su role")
   

    if(matchPermission.permission.includes("NO")){
        return false;
    }
    if(matchPermission.permission.includes("SI")){

        if(!param){
            if(matchPermission.authorization.includes("ANY")){
                return true;
             }
             if(matchPermission.authorization.includes("NA")){
                return false;
             }

             if(matchPermission.authorization.includes("OWN")){
                throw new UnauthorizedException("Permiso no puede ir en OWN")
   
                // return false;
            }
        }


        if(user.document===userDocument){
            return true;
        }else if(matchPermission.authorization.includes("ANY")){
           return true;
        }else if(matchPermission.authorization.includes("OWN")){
            return false;
        }
             
    } 

}

async createOne(dto:CreatePermissionDto){
    const permission= await this.permissionRepository.create(dto as any);
    return await this.permissionRepository.save(permission);
}

async editOne(id:number, dto:EditPermissionDto){
    const permission = await this.permissionRepository.findOneBy({id:id});
    if(!permission) throw new NotFoundException('No existe un Permiso')
    const editedPermission= Object.assign(permission,dto);
    return await this.permissionRepository.save(editedPermission);
}

async deleteOne(id:number){
    const permission = await this.permissionRepository.findOneBy({id:id});
    if(!permission) throw new NotFoundException();
    return await this.permissionRepository.remove(permission);
}

}
