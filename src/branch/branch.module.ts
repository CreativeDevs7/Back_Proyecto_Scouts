import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { UserModule } from 'src/user/user.module';
import { PermissionModule } from 'src/permission/permission.module';

const entityBranch= TypeOrmModule.forFeature([Branch]);

@Module({
  imports:[entityBranch, forwardRef(() => PermissionModule)],
  controllers: [BranchController],
  providers: [BranchService],
  exports:[BranchService]
})
export class BranchModule {}


