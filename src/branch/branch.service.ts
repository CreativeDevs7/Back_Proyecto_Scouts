import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities';
import { CreateBranchDto, EditBranchDto } from './dto';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

@Injectable()
export class BranchService {

    constructor(
        @InjectRepository(Branch)
        private readonly branchRepository:Repository<Branch>
    ){}
    
    async countBranch(id:number){
        const branch = await this.branchRepository.findOneBy({id:id});
        if(!branch) throw new NotFoundException("No existe la rama");
        return branch;
    }
    async getMany():Promise<Branch[]>{
        const branch = await this.branchRepository.find();
        if(!branch) throw new NotFoundException("No existen ramas");
        return branch;
    }
 
    async getOne(id:number){
        const branch = await this.branchRepository.findOneBy({id:id});
        if(!branch) throw new NotFoundException("La rama no existe en la base de datos");
        return branch; 
    }
    
    async createOne(dto:CreateBranchDto){
        const branch = await this.branchRepository.create(dto);
        return await this.branchRepository.save(branch);
    }
    
    async editOne(id:number, dto:EditBranchDto){
        const branch = await this.branchRepository.findOneBy({id:id});
        if(!branch) throw new NotFoundException('No existe una rama con ese id')
        const editedbranch= Object.assign(branch,dto);
        return await this.branchRepository.save(editedbranch);
    }
    
    async deleteOne(id:number){
        const branch = await this.branchRepository.findOneBy({id:id});
        if(!branch) throw new NotFoundException();
        return await this.branchRepository.remove(branch);
    }

    async getBranchAndUserById(id:number):Promise<Branch[]>{    
        let data=[]
        const branch = await this.branchRepository.findOneBy({id:id});
        const usersBranch = await this.branchRepository
        
        .createQueryBuilder("branches")
        .leftJoinAndSelect('branches.users', 'user')
        .where('branchesId = :id', { id }) 
        .getMany();
        
        if(!branch) throw new NotFoundException('No existe una rama relacionada');
        usersBranch.forEach(userBranch => { 
            // if(userBranch.users.length==0) throw new NotFoundException('La rama no tiene usuarios');
             data= userBranch.users;
            
        });
        if(data.length==0) throw new NotFoundException('La rama no tiene usuarios');
        return usersBranch;
    }

    async getBranchAndUserById2(id:number):Promise<Branch>{    
        
        const branchUser = await this.branchRepository
        .createQueryBuilder('branch')
        .leftJoinAndSelect('branch.users', 'user')
        .where('user.id = :id', { id })
        .getOne()
        if(!branchUser) throw new BadRequestException(`el Usuario no tiene una rama asignada una rama`)
        return branchUser;
    }

}

