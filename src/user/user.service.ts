import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SendService } from '../sendmail/sendmail.service';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entities';
import { Branch } from 'src/branch/entities';
import { BranchService } from 'src/branch/branch.service';
import { EditDatahealthDto } from 'src/data-health/dto';
import { CreateUserPersonalDto } from './dtos/create-user_personal.dto';
import { PersonalDetailsService } from 'src/personal-details/personal_details.service';
import { CreatePersonalDetailsDto } from 'src/personal-details/dto';
import { ParentService } from 'src/parents/parents.service';
import * as jwt from 'jsonwebtoken';
import { PersonalDetails } from 'src/personal-details/entities';

export interface IuserFind {
    email?:string;
    document?:string;
}

@Injectable()
export class UserService {

    
constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly sendMail:SendService,
    private readonly branchService:BranchService,
    private readonly personalDetailsService:PersonalDetailsService,
    private readonly parentService:ParentService
     
    

){}

async getMany():Promise<User[]>{
    const users= await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .leftJoinAndSelect('user.branches', 'branches')
    .getMany()
    if(!users) throw new NotFoundException("No existen usuarios en la base de datos");
    return users; 
}


async getOne(id:number){

    const userPersonal=await this.getUserPersonal(id);


    if(!userPersonal.personalDetails){
    const user= await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .leftJoinAndSelect('user.branches', 'branches')
    .where({id})
    .getOne();
    if(!user) throw new NotFoundException("Usuario no existe en la base de datos"); 
    return user;
    }
    if(userPersonal.personalDetails){
        const user= await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.roles', 'roles')
        .leftJoinAndSelect('user.branches', 'branches')
        .leftJoinAndSelect('user.personalDetails', 'personalDetails')
        .where({id})
        .getOne();
        if(!user) throw new NotFoundException("Usuario no existe en la base de datos"); 
        return user;

    }



}

async getUserPersonal(id:number){
    const user= await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.personalDetails', 'personalDetails')
    .where({id})
    .getOne();
    if(!user) throw new NotFoundException("Usuario no existe en la base de datos"); 
    return user;
}


async getOneUserRole(id:number){
    const user= await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .where({id})
    .getOne();

    return user;
}



async createOne(dto:CreateUserDto){
    let branch:Branch;
    const branchTemp:Branch[] = await this.branchService.getMany();
    branchTemp.map((data:Branch)=>branch=data);
    if(!branch) throw new BadRequestException(`No existen ramas en la base de datos`)    
    const documentExist = await this.userRepository.findOneBy({document: dto.document});
    if(documentExist) throw new BadRequestException('Usuario ya se encuentra registrado con este documento')
    const emailExist = await this.userRepository.findOneBy({email:dto.email});
    if(emailExist) throw new BadRequestException('Usuario ya se encuentra registrado con este email')
    const newUser= await this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    await this.sendMail.sendMailNewUser(newUser);
    
    delete user.document;
    delete user.documentType;
    delete user.createDate;
    delete user.birthDate;
    delete user.password;
    delete user.parents;
    delete user.userDetails;
    delete user.responsibleSign;
    delete user.dataHealth;
    delete user.profileImage;
    return user;

}

async createOneUserPersonal(dto:CreateUserPersonalDto){
    let branch:Branch;
    const branchTemp:Branch[] = await this.branchService.getMany();
    branchTemp.map((data:Branch)=>branch=data);
    if(!branch) throw new BadRequestException(`No existen ramas en la base de datos`)    
    const documentExist = await this.userRepository.findOneBy({document: dto.document});
    if(documentExist) throw new BadRequestException('Usuario ya se encuentra registrado con este documento')
    const emailExist = await this.userRepository.findOneBy({email:dto.email});
    if(emailExist) throw new BadRequestException('Usuario ya se encuentra registrado con este email')
    const newUser= await this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    await this.sendMail.sendMailNewUser(newUser);
    
    delete user.document;
    delete user.documentType;
    delete user.createDate;
    delete user.birthDate;
    delete user.password;
    delete user.parents;
    delete user.userDetails;
    delete user.responsibleSign;
    delete user.dataHealth;
    delete user.profileImage;
    return user;

}

async createUserWithPersonal(dto:CreateUserPersonalDto, dtoPersonalDetails:CreatePersonalDetailsDto){
    let branch:Branch;
    const branchTemp:Branch[] = await this.branchService.getMany();
    branchTemp.map((data:Branch)=>branch=data);
    if(!branch) throw new BadRequestException(`No existen ramas en la base de datos`)    
    const documentExist = await this.userRepository.findOneBy({document: dto.document});
    if(documentExist) throw new BadRequestException('Usuario ya se encuentra registrado con este documento')
    const emailExist = await this.userRepository.findOneBy({email:dto.email});
    if(emailExist) throw new BadRequestException('Usuario ya se encuentra registrado con este email')
    const newUser= await this.userRepository.create(dto);
    const user = await this.userRepository.save(newUser);
    // await this.sendMail.sendMailNewUser(newUser);
    const personalDetails= await this.personalDetailsService.createWithUser(dtoPersonalDetails, user)
    
    delete user.document;
    delete user.documentType;
    delete user.createDate;
    delete user.birthDate;
    delete user.password;

    return user;

}

async editOneUserPersonal(id:number, dto:EditUserDto){
    const user = await this.userRepository.findOneBy({id:id});
    if(!user) throw new NotFoundException('Usuario no existe')
    if(user.document!=dto.document) throw new BadRequestException('El documento fue modificado desde el front')
    const documentExist = await this.userRepository.findOneBy({document: dto.document});
    //if(documentExist.document!=dto.document) throw new BadRequestException('Usuario con este documento ya existe')
    /*const emailExist = await this.findByEmail(dto.email);
    if(emailExist){
        if(emailExist.id==id){
        }else throw new BadRequestException('Usuario con este correo ya se encuentra registrado')
    }

    if (dto.branches) {
        const branchExist= await this.userRepository.findOneBy({branches:dto.branches.users});
        if(branchExist) throw new BadRequestException('Usuario ya se encuentra registrado con esta rama')
    
        const branchTemp = await this.branchService.getOne(dto.branches.id);
    
        if(branchTemp.id){
        } else if(branchTemp.id){ throw new BadRequestException(`la rama a asignar no existe`) }
    
    }*/

    const editUser= Object.assign(user,dto);
    const editedUser = await this.userRepository.save(editUser);

    delete editedUser.document;
    delete editedUser.documentType;
    delete editedUser.createDate;
    delete editedUser.birthDate;
    delete editedUser.password;
    return editedUser;
}

async editOne(id:number, dto:EditUserDto){
    const user = await this.userRepository.findOneBy({id:id});
    if(!user) throw new NotFoundException('Usuario no existe')
    if(user.document!=dto.document) throw new BadRequestException('El documento fue modificado desde el front')
    const documentExist = await this.userRepository.findOneBy({document: dto.document});
    /*if(documentExist.document!=dto.document) throw new BadRequestException('Usuario con este documento ya existe')
    const emailExist = await this.findByEmail(dto.email);
    if(emailExist){
        if(emailExist.id==id){
        }else throw new BadRequestException('Usuario con este correo ya se encuentra registrado')
    }

    if (dto.branches) {
        const branchExist= await this.userRepository.findOneBy({branches:dto.branches.users});
        if(branchExist) throw new BadRequestException('Usuario ya se encuentra registrado con esta rama')
    
        const branchTemp = await this.branchService.getOne(dto.branches.id);
    
        if(branchTemp.id){
        } else if(branchTemp.id){ throw new BadRequestException(`la rama a asignar no existe`) }

    
    }*/

    const editUser= Object.assign(user,dto);
    const editedUser = await this.userRepository.save(editUser);
    delete editedUser.document;
    delete editedUser.documentType;
    delete editedUser.createDate;
    delete editedUser.birthDate;
    delete editedUser.password;
    return editedUser;
}


async deleteOne(id:number){
    const user = await this.userRepository.findOneBy({id:id});
    if(!user) throw new NotFoundException("No existe el usuario en la base de datos");
    const userDeleted= await this.userRepository.remove(user);
    // const dataParent= await this.parentService.deleteOne(id);
    // const dataUserDetail= await this.userDetailsService.deleteOne(id);
    // const dataHealth= await this.dataHealthService.deleteOne(id);
    // const dataSign= await this.responsibleSignService.deleteOne(id);
    // const dataGalery= await this.galleryService.deleteOne(id);
    
    return userDeleted;
}

async findByEmail(email:string){
    return await this.userRepository
    .createQueryBuilder('user')
    .where({email})
    .addSelect('user.password')
    .getOne()
}

async findByDocument(document:string){    
    
    const user= this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.roles', 'roles')
    .leftJoinAndSelect('user.branches', 'branches')
    .where({document})
    .addSelect('user.password')
    .getOne()

    return user;


}

async getUserAndUserDetailsById(id:number):Promise<User>{    
    const data = await this.userRepository.findOne({relations: ["userDetails"], where: { id: id}})

    return data
}

async FinDetails(id:number){    
    const data = await this.userRepository.findOne({relations: ["userDetails"], where: { id: id}})
    if(!data){
        throw new BadRequestException('No hay usuario registrado')
    }
    return data.userDetails
}


async getUserAndResponsibleSignById(id:number):Promise<User>{    
    const data = await this.userRepository.findOne({relations: ["responsibleSign"], where: { id: id}})

    return data
}

async getUserAndBranchById(id:number):Promise<User>{    
    const data = await this.userRepository.findOne({relations: ["branches"], where: { id: id}})
    return data
        
}

async getUserAndDataHealthById(id:number){
    const data = await this.userRepository.findOne({relations: ["dataHealth"], where: { id: id}})

    return data
}

async FindDataheath(id:number){
    const data = await this.userRepository.findOne({relations: ["dataHealth"], where:{id:id}})
    if(!data){
        throw new BadRequestException('No hay usuario registrado')
    }
    return data.dataHealth
   
}

async FindPayment(id:number){
    const data = await this.userRepository.findOne({relations: ["payments"], where:{id:id}})
    if(!data){
        throw new BadRequestException('No hay usuario registrado')
    }
    return data.payments
   
}

async findPaymentByConcept(id:number){    
    return await this.userRepository
    .createQueryBuilder("users")
    .leftJoinAndSelect('users.payments', 'payments')
    .leftJoinAndSelect('payments.paymentConcepts', 'payment_concepts')
    .where('userId = :id', { id })
    .getOne()
}

async editOneUsersBranches(userId:number, branchId:number){
    // let branchUser:Branch;
    let userBranch:User;
    
    // const userTemp = await this.getOne(userId);
    const branchData = await this.branchService.getBranchAndUserById(userId);
    const branchTemp = await this.branchService.getOne(branchId);
    if(!branchTemp) throw new BadRequestException(`la rama a asignar no existe`)
    if(!branchData) throw new BadRequestException(`el Usuario no tiene rama asignada`)
    // branchData.users.map((data:User)=>userBranch=data);

    if(userBranch.id) throw new BadRequestException(`el Usuario ya tiene asignado una rama`)

     return await this.userRepository
    .createQueryBuilder()
    .update("users")
    .set({branches:{
        id:branchId
    }})
    .where("id = :userId", {userId})
    .execute();
}

async getPhoto(id:number) {
    const data = await this.userRepository.findOne({relations: ["profileImage"], where: { id: id}})
    if(!data) throw new NotFoundException();
    return data
}

async findDatahealth(userId:number){    
    return await this.userRepository
    .createQueryBuilder("users")
    .leftJoinAndSelect('users.dataHealth', 'data_healths')
     .where('userId = :id', { userId })
    .getOne()
}

async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = auth.split(' ')[1];
    try {
      const decoded: any = await jwt.verify(token, process.env.JWT_SECRET);

      return decoded;
    } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.UNAUTHORIZED);
    }
  }

  async getManypersonal():Promise<User[]>{
    let data;
    let data2=[];
    const personals= await this.userRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.personalDetails', 'personal_details')
    .leftJoinAndSelect('user.branches', 'branches')
    .getMany()
    if(!personals) throw new NotFoundException("No existen usuarios en la base de datos");

    personals.forEach(details => { 
       if(details.personalDetails){
           data2.push(details)
       }
    });

    return data2; 
}

async FindPersonal(id:number){    
    const data = await this.userRepository.findOne({relations: ["personalDetails"], where: { id: id}})
    if(!data){
        throw new BadRequestException('No hay Personal registrado')
    }
    return data.personalDetails
}
  }




