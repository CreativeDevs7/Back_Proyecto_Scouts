import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from 'src/user/user.module';
import { PersonalDetails } from './entities';
import { PersonalDetailsController } from './personal_details.controller';
import { PersonalDetailsService } from './personal_details.service';

const entityPersonalDetails = TypeOrmModule.forFeature([PersonalDetails]);

@Module({
  imports:[entityPersonalDetails, 
    forwardRef(() => PermissionModule),
    forwardRef(() => UserModule)
  ],
  controllers: [PersonalDetailsController],
  providers: [PersonalDetailsService],
  exports:[PersonalDetailsService]
})
export class PersonalDetailsModule {}
