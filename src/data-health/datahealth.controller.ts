import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditDatahealthDto, CreateDatahealthDto } from './dto';
import { DataHealthService } from './datahealth.service';
import { Auth } from '../common/decorators';
import { CreateDiseaseDto } from '../disease/dto';
import { CreateInterventionDto } from '../intervention/dto';

@ApiTags('DataHealths')
@Controller('datahealths')
export class DataHealthController {

    constructor(private readonly DataHealthService:DataHealthService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.DataHealthService.getMany();
       return {
           message:"Formulario de medicina cargado",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.DataHealthService.getOne(id);
       return {
           message:"Formulario de medicina cargado",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(
            @Body("dataHealth")dto:CreateDatahealthDto,
            @Body("diseases")dtodisease:[CreateDiseaseDto],
            @Body("interventions")dtointervention:[CreateInterventionDto]
    ){
       const data= await this.DataHealthService.createOne(dto);
       return {
           message:"Formulario de medicina cargado",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditDatahealthDto){
       const data= await this.DataHealthService.editOne(id,dto);
       return {
           message:"Formulario de medicina cargado",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.DataHealthService.deleteOne(id);
    }

}