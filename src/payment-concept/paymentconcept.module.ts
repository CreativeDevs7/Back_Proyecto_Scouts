import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from 'src/payment/payment.module';
import { PermissionModule } from 'src/permission/permission.module';
import { PaymentConcept } from './entities';
import { PaymentConceptController } from './paymentconcept.controller';
import { PaymentConceptService } from './paymentconcept.service';


const entityPaymentconcep = TypeOrmModule.forFeature([PaymentConcept]);

@Module({
  imports:[ entityPaymentconcep, forwardRef(() => PermissionModule)],
  controllers: [PaymentConceptController],
  providers: [PaymentConceptService],
  exports:[PaymentConceptService]

})
export class PaymentConceptModule {}