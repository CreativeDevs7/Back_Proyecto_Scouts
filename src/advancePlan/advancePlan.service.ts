import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBranchDto } from 'src/branch/dto';
import { User } from 'src/user/entities';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateAdvancePlanDto, EditAdvancePlanDto} from './dtos';
import { AdvancePlan } from './entities';

@Injectable()
export class AdvancePlanService {
    constructor(
    @InjectRepository(AdvancePlan)
        private readonly advancePlanRepository:Repository<AdvancePlan>,
        private readonly userService:UserService,
    ){}

    async getMany():Promise<AdvancePlan[]>{
        const advance= await this.advancePlanRepository.find();
        if(!advance) throw new NotFoundException("No existen usuarios en la base de datos");
        return advance; 
    }

    async getOne(id:number){
        const advance= await this.advancePlanRepository.findOne({where: {id:id}});
        if(!advance) throw new NotFoundException();
        return advance; 
    }

    async createOne(dto:CreateAdvancePlanDto, id:number, dtobranches:CreateBranchDto){
        const user = await this.userService.getOne(id);
        const advance = await this.getAdvancePlan(id)
        if (advance){
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'El plan de avances ya existe!',
              }, HttpStatus.FORBIDDEN);
            }
        else
            {
                const advance= await this.advancePlanRepository.create({...dto, user:user, ...dtobranches});
                if(!advance) throw new NotFoundException('No se ha creado ningun adelanto')        
                return await this.advancePlanRepository.save(advance);
            }
        
    }
        async editOne(id:number,dto:EditAdvancePlanDto){
        const advance = await this.advancePlanRepository.findOneBy({id:id});
        if(!advance) throw new NotFoundException('No existe un adelanto')
        const editedadvance= await this.advancePlanRepository.update({id},dto)
        
        return editedadvance;
    
    }
    async editDate(id:number){
        const advance = await this.advancePlanRepository.findOneBy({id:id});
        if(!advance) throw new NotFoundException('No existe un adelanto')
        var date = new Date();
        return await this.advancePlanRepository.update({updateDate:date},advance)
        
    
    }
    async deleteOne(id:number){
        const advance = await this.advancePlanRepository.findOneBy({id:id});
        if(!advance) throw new NotFoundException();
        return await this.advancePlanRepository.remove(advance);
    }

    async getAdvancePlan(id:number){
        const advance_plan = await this.advancePlanRepository.createQueryBuilder("advancePlan")
        .leftJoinAndSelect('advancePlan.advances', 'advances')
        .leftJoinAndSelect('advancePlan.user', 'users')
        .leftJoinAndSelect('advances.branches', 'branches')
        .where('userId = :id', { id })
        .getOne()
        if(!advance_plan){
            return null
        }
        return advance_plan
    }
    
}