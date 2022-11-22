import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { Auth } from '../common/decorators';
import { EditPersonalDetailsDto, CreatePersonalDetailsDto } from './dto';
import { PersonalDetailsService } from './personal_details.service';

@ApiTags('Personal_details')
@Controller('personalDetails')
export class PersonalDetailsController {

    constructor(
        private readonly personalDetailsService:PersonalDetailsService,
        private readonly userService:UserService
        ){}

    // @Auth()
    // @Get()
    // async getMany(){
    //    const data= await this.personalDetailsService.getMany();
    //    return {
    //        message:"Detalles de personal cargado con exito",
    //        data:data
    //    }
    // }

    @Auth()
    @Get()
    async getManyUsers(){
       const data= await this.userService.getManypersonal()
       return {
           message:"Detalles de personal cargado con exito",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.personalDetailsService.getOne(id);
       return {
           message:"Detalles de personal cargado con exito",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreatePersonalDetailsDto){
       const data= await this.personalDetailsService.createOne(dto);
       return {
           message:"Detalles de personal cargado con exito",
           data:data
       }
    }


    // @Auth()
    // @Put(':id')
    // async editOne(@Param('id') id:number,@Body()dto:EditPersonalDetailsDto){
    //    const data= await this.personalDetailsService.editOne(id,dto,userId);
    //    return {
    //        message:"Detalles de personal cargado con exito",
    //        data:data
    //    }
    // }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.personalDetailsService.deleteOne(id);
    }

}
