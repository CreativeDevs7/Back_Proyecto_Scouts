import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchModule } from 'src/branch/branch.module';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import {  Permission } from './entities';
import { PermissionsController } from './permission.controller';
import { PermissionService } from './permission.service';

const entityPermission = TypeOrmModule.forFeature([Permission]);

@Module({
  imports:[entityPermission, 
    forwardRef(() => UserModule),
    forwardRef(() => BranchModule) 
  
  ],
  controllers: [PermissionsController],
  providers: [PermissionService],
  exports:[PermissionService]
})
export class PermissionModule {}