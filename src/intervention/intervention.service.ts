import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInterventionDto, EditInterventionDto } from './dto';
import { Intervention } from './entities';

@Injectable()
export class InterventionService {

    
constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository:Repository<Intervention>
){}

async getMany():Promise<Intervention[]>{
    return await this.interventionRepository.find(); 
}

async getOne(id:number){
    const intervention= await this.interventionRepository.findOneBy({id:id});
    if(!intervention) throw new NotFoundException('No se encuentran las intervenciones');
    return intervention; 
}

async createOne(dto:CreateInterventionDto){
    const intervention= await this.interventionRepository.create(dto);
    return await this.interventionRepository.save(intervention);
}

async editOne(id:number, dto:EditInterventionDto){
    const intervention = await this.interventionRepository.findOneBy({id:id});
    if(!intervention) throw new NotFoundException('No existe una intervención')
    const editedintervention= Object.assign(intervention,dto);
    return await this.interventionRepository.save(editedintervention);
}

async deleteOne(id:number){
    const intervention = await this.interventionRepository.findOneBy({id:id});
    if(!intervention) throw new NotFoundException();
    return await this.interventionRepository.remove(intervention);
}

}
