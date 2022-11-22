import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParentDto, EditParentDto } from './dtos';
import { Parent } from './entities';

@Injectable()
export class ParentService {
    parents: Parent[] = [];

    
constructor(
    @InjectRepository(Parent)
    private readonly parentRepository:Repository<Parent>,
){}


async getMany():Promise<Parent[]>{
    return await this.parentRepository.find(); 
}

async getOne(id:number){
    const parent= await this.parentRepository.findOneBy({id:id});
    if(!parent) throw new NotFoundException();
    return parent; 
}

async createOne(dto:CreateParentDto[]){
    const parent= await this.parentRepository.create(dto);
    return await this.parentRepository.save(parent);
}

async editOne(id:number, dto:EditParentDto){
    const parent = await this.parentRepository.findOneBy({id:id});
    if(!parent) throw new NotFoundException('Acudiente no existe')
    const editedParent= Object.assign(parent,dto);
    return await this.parentRepository.save(editedParent);
}

async deleteOne(id:number){
    const parents = await this.parentRepository.findOneBy({id:id});
    
    if(!parents) throw new NotFoundException();
    return await this.parentRepository.remove(parents);
}
async findAll(){
    const data = await this.parentRepository
    .createQueryBuilder('parents')
    .where("userId")
    .getMany()
}

async deleteAll(id:number){
    const data = await this.parentRepository
    .createQueryBuilder('parents')
    .where(`userId='${id}'`)
    .delete()
}


async findParentsByUserId(id:number){    
    return await this.parentRepository
    .createQueryBuilder('parents')
    .where(`userId='${id}'`)
    .getMany()
}

}