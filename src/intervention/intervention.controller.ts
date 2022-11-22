import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { EditInterventionDto, CreateInterventionDto } from './dto';
import { InterventionService } from './intervention.service';

@ApiTags('Users')
@Controller('interventions')
export class InterventionController {

    constructor(private readonly InterventionService:InterventionService){}

    // @Auth()
    @Get()
    async getMany(){
       const data= await this.InterventionService.getMany();
       return {
           message:"Intervención cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.InterventionService.getOne(id);
       return {
           message:"Intervención cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Post()
    async createOne(@Body()dto:CreateInterventionDto){
       const data= await this.InterventionService.createOne(dto);
       return {
           message:"Intervención cargada con exito",
           data:data
       }
    }

    // @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditInterventionDto){
       const data= await this.InterventionService.editOne(id,dto);
       return {
           message:"Intervención cargado con exito",
           data:data
       }
    }

    // @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.InterventionService.deleteOne(id);
    }

}
