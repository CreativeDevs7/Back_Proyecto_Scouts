import { Body, Controller, Get, Post, UseGuards, Req, Put } from '@nestjs/common';
import { Auth, User } from '../common/decorators';
import { User as UserEntity } from '../user/entities';
import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { ResetPasswordDto } from './dtos/resetpassword.dto';
import { ForgotPasswordDto } from './dtos/forgotpassword.dto';


@ApiTags("Auth")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body()loginDto:LoginDto, @User() user:UserEntity){ 
       const data= await this.authService.login(user);
       return {
           message:"Login exitoso",
           data:data
       };
    }


   @Auth() 
    @Get('profile')
    profile(@User() user?:UserEntity){
         return {
            message:"Perfil Obtenido",
            user:user
        };
    }

   @Auth()
    @Get('refresh')
    async refreshToken(@User() user:UserEntity){
        const data= await this.authService.login(user);
         return {
            message:"Refresh Exitoso",
            data:data
        };
    }
    @Post('forgot-password')
    async forgotPassword( @Body()dto: ForgotPasswordDto){
        const data= await this.authService.forgotPassword(dto.email);
         return {
            message:"¡Token enviado con Exito!",
            data:data
        };
    }
    // @Body("email") email:string,
    @Auth()
    @Put('reset-password')
    async resetPassword(@User() user:UserEntity, @Body() dto:ResetPasswordDto){ 
        const data= await this.authService.resetPassword(user,dto.password);
       return {
           message:"Cambio de contraseña exitoso",
           data:data
       };
    }

    

}
