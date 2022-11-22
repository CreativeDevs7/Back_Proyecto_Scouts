import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { EditDiseaseDto, CreateDiseaseDto } from './dto';
import { DiseaseService } from './disease.service';

@ApiTags('Users')
@Controller('diseases')
export class DiseaseController {

    constructor(private readonly DiseaseService:DiseaseService){}

    // @Auth()
    @Get()
    async getMany(){
       const data= await this.DiseaseService.getMany();
       return {
           message:"Enfermedad cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.DiseaseService.getOne(id);
       return {
           message:"Enfermedad cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Post()
    async createOne(@Body()dto:CreateDiseaseDto){
       const data= await this.DiseaseService.createOne(dto);
       return {
           message:"Enfermedad cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditDiseaseDto){
       const data= await this.DiseaseService.editOne(id,dto);
       return {
           message:"Enfermedad cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.DiseaseService.deleteOne(id);
    }

}
