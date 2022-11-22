import {forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Advance } from "./entities";
import { AdvanceService } from "./advance.service";
import { AdvanceController } from "./advance.controller";
import { AdvancePlanModule } from "src/advancePlan/advancePlan.module";
import { UserModule } from "src/user/user.module";
import { User } from 'src/user/entities';
import { PermissionModule } from "src/permission/permission.module";


const entityAdvance = TypeOrmModule.forFeature([Advance]);

@Module({
    imports:[entityAdvance, AdvancePlanModule,
      forwardRef(() => UserModule),
      // TypeOrmModule.forFeature([ User])
      forwardRef(() => PermissionModule)
    ],
    controllers: [AdvanceController],
    providers: [AdvanceService],
    exports:[AdvanceService]
  })
export class AdvanceModule {}