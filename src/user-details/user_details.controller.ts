import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { CreateUserDetailsDto, EditUserDetailsDto } from './dto';
import { UserDetailsService } from './user_details.service';

@ApiTags('UserDetails')
@Controller('userdetails')
export class UserDetailsController {

    constructor(private readonly userDetailsService:UserDetailsService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.userDetailsService.getMany();
       return {
           message:"Detalles de los usuarios Cargados",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.userDetailsService.getOne(id);
       return {
           message:"Detalles de los usuarios cargados",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreateUserDetailsDto){
       const data= await this.userDetailsService.createOne(dto);
       return {
           message:"Detalles de los usuarios cargados",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditUserDetailsDto){
       const data= await this.userDetailsService.editOne(id,dto);
       return {
           message:"Detalles de usuario editados",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.userDetailsService.deleteOne(id);
    }

}
