import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PermissionModule } from 'src/permission/permission.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports:[
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions:{expiresIn:'60m'}
      })
    }),
    forwardRef(() => PermissionModule),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy,JwtStrategy]
})
export class AuthModule {}
