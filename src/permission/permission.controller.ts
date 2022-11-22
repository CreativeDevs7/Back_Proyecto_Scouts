import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { CreatePermissionDto, EditPermissionDto } from './dtos';
import { PermissionService } from './permission.service';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {

    constructor(private readonly PermissionService:PermissionService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.PermissionService.getMany();
       return {
           message:"permiso cargado con exito",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.PermissionService.getOne(id);
       return {
           message:"Rol cargado con exito",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreatePermissionDto){
       const data= await this.PermissionService.createOne(dto);
       return {
           message:"Rol creado con exito",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditPermissionDto){
       const data= await this.PermissionService.editOne(id,dto);
       return {
           message:"Permiso editado con exito",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.PermissionService.deleteOne(id);
    }

}