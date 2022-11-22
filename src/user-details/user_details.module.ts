import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from 'src/permission/permission.module';
import { UserDetails } from './entities';
import { UserDetailsController } from './user_details.controller';
import { UserDetailsService } from './user_details.service';
import { UserModule } from 'src/user/user.module';

const entityUserDetails = TypeOrmModule.forFeature([UserDetails]);

@Module({
  imports:[entityUserDetails, forwardRef(() => PermissionModule),
    forwardRef(() => UserModule)],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports:[UserDetailsService]
})
export class UserDetailsModule {}