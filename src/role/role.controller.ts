import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../common/decorators';
import { CreateRoleDto, EditRoleDto } from './dtos';
import { RoleService } from './role.service';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private readonly RoleService:RoleService){}

    @Auth()
    @Get()
    async getMany(){
       const data= await this.RoleService.getMany();
       return {
           message:"Rol cargado con exito",
           data:data
       }
    }

    @Auth()
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id:number){
       const data= await this.RoleService.getOne(id);
       return {
           message:"Rol cargado con exito",
           data:data
       }
    }

    @Auth()
    @Post()
    async createOne(@Body()dto:CreateRoleDto){
       const data= await this.RoleService.createOne(dto);
       return {
           message:"Rol creado con exito",
           data:data
       }
    }

    @Auth()
    @Put(':id')
    async editOne(@Param('id') id:number,@Body()dto:EditRoleDto){
       const data= await this.RoleService.editOne(id,dto);
       return {
           message:"Role editado con exito",
           data:data
       }
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id') id:number){
      return  await this.RoleService.deleteOne(id);
    }

}