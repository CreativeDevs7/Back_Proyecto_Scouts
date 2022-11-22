import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiseaseDto, EditDiseaseDto } from './dto';
import { Disease } from './entities';

@Injectable()
export class DiseaseService {

    
constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository:Repository<Disease>
){}

async getMany():Promise<Disease[]>{
    return await this.diseaseRepository.find(); 
}

async getOne(id:number){
    const disease= await this.diseaseRepository.findOneBy({id:id});
    if(!disease) throw new NotFoundException('No se encuentran las enfermedades');
    return disease; 
}

async createOne(dto:CreateDiseaseDto){
    const disease= await this.diseaseRepository.create(dto as any);
    return await this.diseaseRepository.save(disease);
}

async editOne(id:number, dto:EditDiseaseDto){
    const disease = await this.diseaseRepository.findOneBy({id:id});
    if(!disease) throw new NotFoundException('No existe una enfermedad')
    const editeddisease= Object.assign(disease,dto);
    return await this.diseaseRepository.save(editeddisease);
}

async deleteOne(id:number){
    const disease = await this.diseaseRepository.findOneBy({id:id});
    if(!disease) throw new NotFoundException();
    return await this.diseaseRepository.remove(disease);
}

}
