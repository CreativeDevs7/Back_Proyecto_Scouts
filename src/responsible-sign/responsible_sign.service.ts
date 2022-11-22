import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResponsibleSignDto, EditResponsibleSignDto } from './dto';
import { ResponsibleSign } from './entities';

@Injectable()
export class ResponsibleSignService {

    
constructor(
    @InjectRepository(ResponsibleSign)
    private readonly responsibleSignRepository:Repository<ResponsibleSign>
){}

async getMany():Promise<ResponsibleSign[]>{
    return await this.responsibleSignRepository.find(); 
}

async getOne(id:number){
    const responsible= await this.responsibleSignRepository.findOneBy({id:id});
    if(!responsible) throw new NotFoundException();
    return responsible; 
}

async createOne(dto:CreateResponsibleSignDto){
    const responsible= await this.responsibleSignRepository.create(dto as any);
    return await this.responsibleSignRepository.save(responsible);
}

async editOne(id:number, dto:EditResponsibleSignDto){
    const responsible = await this.responsibleSignRepository.findOneBy({id:id});
    if(!responsible) throw new NotFoundException('No existe un responsable')
    const editedResponsible= Object.assign(responsible,dto);
    return await this.responsibleSignRepository.save(editedResponsible);
}

async deleteOne(id:number){
    const responsibleSign = await this.responsibleSignRepository.findOneBy({id:id});
    if(!responsibleSign) throw new NotFoundException();
    return await this.responsibleSignRepository.remove(responsibleSign);
}

}
