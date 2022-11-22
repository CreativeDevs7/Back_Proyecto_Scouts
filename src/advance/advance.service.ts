import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvanceDto, EditAdvanceDto} from './dtos';
import { Advance } from './entities';
import { AdvancePlanService } from 'src/advancePlan/advancePlan.service';
import { UserService } from 'src/user/user.service';
import { CreateAdvancePlanDto, EditAdvancePlanDto } from 'src/advancePlan/dtos';
import { AdvancePlan } from 'src/advancePlan/entities';
import { Branch } from 'src/branch/entities';

@Injectable()
export class AdvanceService {
    constructor(
        @InjectRepository(Advance)
        private readonly advanceRepository:Repository<Advance>,
        private readonly AdvancePlanService:AdvancePlanService,
        private readonly userService:UserService,
    ){}

    async getOne(id:number){
        const advance= await this.advanceRepository.findOneBy({id});
        if(!advance) throw new NotFoundException();
        return advance; 
    }
    
    async getAll(id:number){
        const advancePlans = await this.AdvancePlanService.getOne(id);
        //const advances = await this.advanceRepository.findBy({ relations: ['branches'] ,where: {advancesPlan:advancePlans}} );
        const advances = await this.advanceRepository.find({ relations: ['advancesPlan'] ,where: {id:id, branches:advancePlans.user}}); //posible solucion
        if(!advances) throw new NotFoundException('No se ha creado ningun adelanto')
        return advances;                  
    }

    async createOne(dto:CreateAdvanceDto, id:number){
        const user2 = await this.userService.getOne(id);
        const advancePlan = await this.advanceRepository.findOneBy(dto.advancePlan);
        if(!advancePlan) throw new NotFoundException('No se ha creado ningun plan de adelanto')
        const user = await this.userService.getUserAndBranchById(id)
        const advance= await this.advanceRepository.create({ ...dto, advancesPlan:advancePlan, branches:user.branches });
        if(!advance) throw new NotFoundException('No se ha creado ningun adelanto')
                return await this.advanceRepository.save(advance);        
    }

    async editOne(id:number,dto:EditAdvanceDto){
        const advance = await this.advanceRepository.findOne({relations:['advancesPlan'],where:{id:id}});
        if(!advance) throw new NotFoundException('No existe un adelanto')
        const editedadvance= await this.advanceRepository.update({...dto},{...advance})
        await this.AdvancePlanService.editDate(advance.advancesPlan.id);
        if(!editedadvance) throw new NotFoundException('No existe un adelanto')
        return editedadvance;
   
    }
     

    async deleteOneAdvance(userId:number,advanceId:number){
        const user = await this.userService.getOne(userId);

        const advancePlan = await this.AdvancePlanService.getAdvancePlan(userId);
        if(!advancePlan) throw new NotFoundException("Usuario no tiene plan de avance debe crear uno, antes de poder borrarlo");

        let advancePlanId = advancePlan.id;
        const advance = await this.advanceRepository
        .createQueryBuilder("advances")
        .delete()
        .where("id = :advanceId", {advanceId})
        .andWhere("advancesPlanId = :advancePlanId", {advancePlanId}) 
        .execute();
        
        if(advance.affected==0) throw new NotFoundException("Avance no existe");
    
        if(advance.affected!=0){
            return "Avance eliminado con exito";
        }
    }
}