import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { async, Observable } from 'rxjs';
import { Permission } from 'src/permission/entities';
import { PermissionService } from 'src/permission/permission.service';
import { User } from 'src/user/entities';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
      private permissionService:PermissionService
    ){}

      canActivate(
    context: ExecutionContext,
  ) : boolean | Promise<boolean> | Observable<boolean>  {
    const request = context.switchToHttp().getRequest();
  
    let path =request.route.path;
    let method= request.method;
    let user:User;
    user=request.user;
    let userId = user.id;
    let roleId=user.roles.id 
    let userDocument = user.document;
    let param = parseInt(request.params.id);
    let id:any = param;
    if (!id) {
      id = user.id
    }
    let access:Permission;

    const validation =this.permissionService.getOnePermission(roleId,userId, userDocument,id, path, method)
    .then((data:boolean)=> data);
    return validation;
    }
      
   
  }

  


