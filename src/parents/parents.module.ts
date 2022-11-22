import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from '../user/user.module';
import { Parent } from './entities';
import { ParentController } from './parents.controller';
import { ParentService } from './parents.service';

const entityParent = TypeOrmModule.forFeature([Parent]);

@Module({
  imports:[entityParent, forwardRef(() => PermissionModule)],
  controllers: [ParentController],
  providers: [ParentService],
  exports:[ParentService]
})
export class ParentModule {}