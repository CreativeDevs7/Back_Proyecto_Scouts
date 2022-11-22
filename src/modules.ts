import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module';
import { SendModule } from './sendmail/sendmail.module';
import { UserModule } from './user/user.module';
import { GalleryModule } from './galleries/gallery.module';
import { PaymentModule } from './payment/payment.module';
import { PaymentConceptModule } from './payment-concept/paymentconcept.module';
import { BranchModule } from './branch/branch.module';
import { AdvanceModule } from './advance/advance.module';
import { AdvancePlanModule } from './advancePlan/advancePlan.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';


@Module({
    imports: [
        AuthModule,
        AccessControlModule.forRoles(roles),
        UserModule,
        SendModule,
        GalleryModule,
        PaymentModule,
        PaymentConceptModule,
        BranchModule,
        AdvanceModule,
        AdvancePlanModule,
    ],
})
export class Modules { }