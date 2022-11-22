import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { ResponsibleSign } from './entities';
import { ResponsibleSignController } from './responsible_sign.controller';
import { ResponsibleSignService } from './responsible_sign.service';

const entityResponsible = TypeOrmModule.forFeature([ResponsibleSign]);

@Module({
  imports:[entityResponsible, forwardRef(() => PermissionModule)],
  controllers: [ResponsibleSignController],
  providers: [ResponsibleSignService],
  exports:[ResponsibleSignService]
})
export class ResponsibleSignModule {}
