import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { EditBranchDto, CreateBranchDto } from './dto';
import { BranchService } from './branch.service';

@ApiTags('Branches')
@Controller('branches')
export class BranchController {

    constructor(private readonly branchService:BranchService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.branchService.getMany();
       return {
           message:"Rama cargada con exito",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.branchService.getOne(id);
       return {
           message:"Rama cargada con exito",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreateBranchDto){
       const data= await this.branchService.createOne(dto);
       return {
           message:"Rama creada con exito",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditBranchDto){
       const data= await this.branchService.editOne(id,dto);
       return {
           message:"Rama cargada con exito",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.branchService.deleteOne(id);
    }

    @Auth()
    @Get('/users/:id')
    async getBranchAndUserById(@Param('id') id:number)
    {
        const data= await this.branchService.getBranchAndUserById(id);
        return {
            message:"Rama cargada",
            data:data
        }
    }


}

