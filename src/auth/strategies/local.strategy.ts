import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy){
 
    constructor(
        private readonly authService:AuthService,
    ){
        super({
            usernameField:'document',
            passwordField:'password'
        })
    }

    async validate(document:string,password:string){
        const user=await this.authService.validateUser(document, password);
       
        return user;
    }

}