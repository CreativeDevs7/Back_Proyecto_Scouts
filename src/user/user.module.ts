import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvanceModule } from 'src/advance/advance.module';
import { AdvancePlanModule } from 'src/advancePlan/advancePlan.module';
import { AuthModule } from 'src/auth/auth.module';
import { BranchModule } from 'src/branch/branch.module';
import { BranchService } from 'src/branch/branch.service';
import { GalleryModule } from 'src/galleries/gallery.module';
import { PaymentConceptModule } from 'src/payment-concept/paymentconcept.module';
//import { PaymentConceptService } from 'src/payment-concept/paymentconcept.service';
import { PaymentModule } from 'src/payment/payment.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PersonalDetailsModule } from 'src/personal-details/personal_details.module';
import { DataHealthModule } from '../data-health/datahealth.module';
import { DiseaseModule } from '../disease/disease.module';
import { InterventionModule } from '../intervention/intervention.module';
import { ParentModule } from '../parents/parents.module';
import { ResponsibleSignModule } from '../responsible-sign/responsible_sign.module';
import { UserDetailsModule } from '../user-details/user_details.module';
import { User } from './entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const entityUser = TypeOrmModule.forFeature([User]);

@Module({
  imports:[
    entityUser,
    ParentModule,
    UserDetailsModule,
    ResponsibleSignModule,
    DataHealthModule,
    InterventionModule,
    DiseaseModule,
    GalleryModule,
    PaymentModule,
    PaymentConceptModule,
    AdvancePlanModule,
    AdvanceModule,
    forwardRef(() => PermissionModule),
    forwardRef(() => PersonalDetailsModule),
    forwardRef(() => BranchModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
