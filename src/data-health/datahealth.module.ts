import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataHealth } from './entities';
import { DataHealthController } from './datahealth.controller';
import { DataHealthService } from './datahealth.service';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';

const entityDatahealth = TypeOrmModule.forFeature([DataHealth]);

@Module({
  imports:[ entityDatahealth, forwardRef(() => PermissionModule),
    forwardRef(()=> UserModule)],
  controllers: [DataHealthController],
  providers: [DataHealthService],
  exports:[DataHealthService]
})
export class DataHealthModule {}