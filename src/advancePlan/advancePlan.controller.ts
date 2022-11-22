import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditAdvancePlanDto, CreateAdvancePlanDto } from './dtos';
import { AdvancePlanService } from './advancePlan.service';
import { Auth } from '../common/decorators';

@ApiTags('advancesPlan')
@Controller('advancesPlan')
export class AdvancePlanController {

    constructor(
        private readonly AdvancePlanService:AdvancePlanService,
    ){}

    @Auth()
    @Get()
    async getMany() {
        const data = await this.AdvancePlanService.getMany();
        return {
            message: "Usuarios Cargados",
            data: data
        }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.AdvancePlanService.getOne(id);
       return {
        message: "Plan de adelanto cargado",
        data:data
       }
    }


    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditAdvancePlanDto){
       const data= await this.AdvancePlanService.editOne(id,dto);
       return {
           message: "Plan de adelanto cargado",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.AdvancePlanService.deleteOne(id);
    }


}
