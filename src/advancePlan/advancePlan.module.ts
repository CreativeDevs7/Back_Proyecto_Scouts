import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdvancePlan } from "./entities";
import { AdvancePlanController } from "./advancePlan.controller";
import { AdvancePlanService } from "./advancePlan.service";
import { UserModule } from "src/user/user.module";
import { User } from "src/user/entities";
import { PermissionModule } from "src/permission/permission.module";

const entityAdvancePlan = TypeOrmModule.forFeature([AdvancePlan]);

@Module({
    imports:[
      entityAdvancePlan,      
      forwardRef(() => UserModule),
      // TypeOrmModule.forFeature([ User])
      forwardRef(() => PermissionModule)

    ],
    controllers: [AdvancePlanController],
    providers: [AdvancePlanService],
    exports:[AdvancePlanService]
  })
export class AdvancePlanModule {

}