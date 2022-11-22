import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataHealth } from './entities';
import { CreateDatahealthDto, EditDatahealthDto } from './dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DataHealthService {

    
constructor(
    @InjectRepository(DataHealth)
    private readonly datahealthRepository:Repository<DataHealth>,
    private readonly userService:UserService
){}

async getMany():Promise<DataHealth[]>{
    return await this.datahealthRepository.find(); 
}

async getOne(id:number){
    const datahealth= await this.datahealthRepository.findOneBy({id:id});
    if(!datahealth) throw new NotFoundException('No se encuentran los datos medicos');
    return datahealth; 
}

async createOne(dto:CreateDatahealthDto){
    const datahealth= await this.datahealthRepository.create(dto);
    return await this.datahealthRepository.save(datahealth);
}

// async editOne(id:number, dto:EditDatahealthDto){
//     const datahealth = await this.datahealthRepository.findOne(id);
//     if(!datahealth) throw new NotFoundException('La ficha medica no existe')
//     const editedDatahealth= Object.assign(datahealth,dto);
//     return await this.datahealthRepository.save(editedDatahealth);
// }

async editOne(id:number, dto:EditDatahealthDto){
    // const datahealth = await this.datahealthRepository.findOne(id);
    const datahealth = await this.userService.FindDataheath(id);
    if(!datahealth) throw new NotFoundException('La ficha medica no existe')
    const editedDatahealth= Object.assign(datahealth,dto);
    //return await this.datahealthRepository.save(editedDatahealth)
    return await this.datahealthRepository.save(editedDatahealth)
}


async deleteOne(id:number){
    const datahealth = await this.datahealthRepository.findOneBy({id:id});
    if(!datahealth) throw new NotFoundException();
    return await this.datahealthRepository.remove(datahealth);
}



}
