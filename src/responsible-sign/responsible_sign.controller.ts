import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { EditResponsibleSignDto, CreateResponsibleSignDto } from './dto';
import { ResponsibleSignService } from './responsible_sign.service';

@ApiTags('Users')
@Controller('signs')
export class ResponsibleSignController {

    constructor(private readonly ResponsibleSignService:ResponsibleSignService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.ResponsibleSignService.getMany();
       return {
           message:"Responsable cargado con exito",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.ResponsibleSignService.getOne(id);
       return {
           message:"Responsable cargado con exito",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreateResponsibleSignDto){
       const data= await this.ResponsibleSignService.createOne(dto);
       return {
           message:"Responsable cargado con exito",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditResponsibleSignDto){
       const data= await this.ResponsibleSignService.editOne(id,dto);
       return {
           message:"Responsable cargado con exito",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.ResponsibleSignService.deleteOne(id);
    }

}
