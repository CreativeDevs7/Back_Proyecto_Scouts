import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const Roles = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
  
    const baseRole:string[] = ["SCOUT", "TESORERA","JEFE RAMA", "JEFE GRUPO"]; 
    
    const user = request.user;

    let dataRole:string;
    const userParam = request.params["id"];
    const roles:String[]= user.roles;


    for (let index = 0; index < roles.length; index++) {
      const element = roles[index];

      if(element==baseRole[index]) throw new UnauthorizedException("No tiene permiso para acceder a este recurso")
    }

    if(user.id!=userParam) throw new UnauthorizedException("No tiene permiso para acceder a esta ruta o no existe")
    return data ? user && user[data] : user;
  },
);