import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { CreateParentDto, EditParentDto } from './dtos';
import { ParentService } from './parents.service';

@ApiTags('Parents')
@Controller('parents')
export class ParentController {

    constructor(private readonly parentService:ParentService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.parentService.getMany();
       return {
           message:"Acudientes Cargados",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.parentService.getOne(id);
       return {
           message:"Acudiente Cargado",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:[CreateParentDto],
    ){
       const data= await this.parentService.createOne(dto);
       return {
           message:"Acudiente Creado",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditParentDto){
       const data= await this.parentService.editOne(id,dto);
       return {
           message:"Acudiente Editado",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.parentService.deleteOne(id);
    }
    

}