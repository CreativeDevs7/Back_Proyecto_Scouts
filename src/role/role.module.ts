import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import {  Role } from './entities';
import { RolesController } from './role.controller';
import { RoleService } from './role.service';

const entityRole = TypeOrmModule.forFeature([Role]);

@Module({
  imports:[entityRole, PermissionModule],
  controllers: [RolesController],
  providers: [RoleService],
  exports:[RoleService]
})
export class RoleModule {}