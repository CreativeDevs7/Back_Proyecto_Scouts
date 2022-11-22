import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/entities';
import { UserService } from '../user/user.service';
import {compare} from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SendService } from '../sendmail/sendmail.service';

@Injectable()
export class AuthService {
     
    constructor(
        private readonly userService:UserService,
        private readonly sendService:SendService,
        private readonly jwtService:JwtService,
        
    ){}


    async validateUser(document:string, password:string):Promise<User>{
  
       const user= await this.userService.findByDocument(document);
        if(!user) throw new NotFoundException('Login usuario o contraseña no fue encontrado');
        if(user.status==false) throw new UnauthorizedException('Usuario esta en estado de aprobación');
        if(await compare(password,user.password ) && user.status==true ){
        delete user.password;
        delete user.document;
        delete user.documentType;
        delete user.birthDate;
        delete user.createDate;

           return user;
       }

       return null;
    }

    async forgotPassword(email:string) {
        const user= await this.userService.findByEmail(email);  
        if(!user) throw new NotFoundException('El correo electronico no existe');
        const {id, ...rest } =user;
        const payload = {sub:id};
        const token = await this.jwtService.sign(payload);
        const data = await this.sendService.sendMailNewToken(user, token);

        return data;
  
}

    login(user:User){
        const {id, ...rest } =user;
        const payload = {sub:id};
        return{
            user,
            accessToken:this.jwtService.sign(payload)
        }
    }

    async resetPassword(user:User,password:string){
        user.password=password;
        const userEdited= await this.userService.editOne(user.id,user);
        return userEdited;
       
    }

    


}
