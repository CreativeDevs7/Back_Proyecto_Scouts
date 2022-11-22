import { Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateUserDetailsDto, EditUserDetailsDto } from './dto';
import { UserDetails } from './entities';

@Injectable()
export class UserDetailsService {

    
constructor(
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository:Repository<UserDetails>,
    private readonly userService:UserService
){}

async getMany():Promise<UserDetails[]>{
    return await this.userDetailsRepository.find(); 
}

async getOne(id:number){
    const userDetail= await this.userDetailsRepository.findOneBy({id});
    if(!userDetail) throw new NotFoundException('No se encuentran los detalles de usuario');
    return userDetail; 
}

async createOne(dto:CreateUserDetailsDto){
    const userDetail= await this.userDetailsRepository.create(dto as any);
    return await this.userDetailsRepository.save(userDetail);
}

async editOne(id:number, dto:EditUserDetailsDto){
    const userDetail = await this.userService.FinDetails(id);
    if(!userDetail) throw new NotFoundException('Detalles de usuario no existente')
    const editedUser= Object.assign(userDetail,dto);
    return await this.userDetailsRepository.save(editedUser);
}

async deleteOne(id:number){
    const userDetails = await this.userDetailsRepository.findOneBy({id}); 
    if(!userDetails) throw new NotFoundException();
    return await this.userDetailsRepository.remove(userDetails);
}

}