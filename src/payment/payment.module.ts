import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';
import { Payment } from './entities';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';



const entityPayment = TypeOrmModule.forFeature([Payment]);

@Module({
  imports:[ entityPayment,
    
    forwardRef(() => UserModule),
    forwardRef(() => PermissionModule),

  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports:[PaymentService]
})
export class PaymentModule {}
