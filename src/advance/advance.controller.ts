import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditAdvanceDto, CreateAdvanceDto } from './dtos';
import { AdvanceService } from './advance.service';
import { Auth } from '../common/decorators';


@ApiTags('advances')
@Controller('advances')
export class AdvanceController {

    constructor(private readonly AdvanceService:AdvanceService){}

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.AdvanceService.getOne(id);
       return {
            message: "Avances del usuario cargados",
            data:data
       }
    }

    /**
     * 
     * @param id advancePlanID
     */
    @Auth()
    @Get('/advances-scout/:id')
    async getAll(@Param('id', ParseIntPipe) id:number){
       const data= await this.AdvanceService.getAll(id);
       return {
            message: "Avances del usuario cargados",
            data:data
       }
    }



    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditAdvanceDto){
       const data= await this.AdvanceService.editOne(id,dto);
       return {
           message: "Avance modificado ",
           data:data
       }
    }

   //  @Auth()
   //  @Delete(':id')
   //  async deleteOne(@Param('id') id:number){
   //    return  await this.AdvanceService.deleteOne(id);
   //  }


}