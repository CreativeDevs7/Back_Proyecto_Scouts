import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities';
// import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePersonalDetailsDto, EditPersonalDetailsDto } from './dto';
import { PersonalDetails } from './entities';

@Injectable()
export class PersonalDetailsService {

    
constructor(
    @InjectRepository(PersonalDetails)
    private readonly personalDetailsRepository:Repository<PersonalDetails>,
    // private readonly userService:UserService
){}

async getMany():Promise<PersonalDetails[]>{
    const personalDetails= await this.personalDetailsRepository.find();
    if(!personalDetails) throw new NotFoundException('No existe un detalle de personal');
    return personalDetails;
}


async getOne(id:number){
    const personalDetails= await this.personalDetailsRepository.findOneBy({id:id});
    if(!personalDetails) throw new NotFoundException('No existe un detalle de personal');
    return personalDetails; 
}

async createOne(dto:CreatePersonalDetailsDto){
    const personalDetails= await this.personalDetailsRepository.create(dto as any);
    return await this.personalDetailsRepository.save(personalDetails);
}

async createWithUser(dto:CreatePersonalDetailsDto, user:User){
    const personalDetails= await this.personalDetailsRepository.create(dto);
    // personalDetails.user=user;
    const dataPersonalDetails = await this.personalDetailsRepository.save(personalDetails);
    
    return dataPersonalDetails;    
}
   
async editOne(id:number, dto:EditPersonalDetailsDto, user:User){
    const personalDetails = await this.personalDetailsRepository.findOneBy({id:id});
    // personalDetails.user=user;
    if(!personalDetails) throw new NotFoundException('No existe un detalle de personal')
    const editedpersonalDetails= Object.assign(personalDetails,dto);
    return await this.personalDetailsRepository.save(editedpersonalDetails);
}

async deleteOne(id:number){
    const PersonalDetails = await this.personalDetailsRepository.findOneBy({id:id});
    if(!PersonalDetails) throw new NotFoundException('No existe un detalle de personal');
    return await this.personalDetailsRepository.remove(PersonalDetails);
}

// async editOnePersonal(id:number, dto:EditPersonalDetailsDto){
//     const personalDetail = await this.userService.FindPersonal(id);
//     if(!personalDetail) throw new NotFoundException('Detalles de personal no existente')
//     const editedPersonal= Object.assign(personalDetail,dto);
//     return await this.personalDetailsRepository.save(editedPersonal);
// }

}
