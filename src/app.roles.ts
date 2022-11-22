import { RolesBuilder } from "nest-access-control";


export enum AppRoles{
    SCOUT = 'SCOUT',
    ADMIN = 'ADMIN'

}

export enum AppResource{
    USER = 'USER',

}

export const roles:RolesBuilder = new RolesBuilder();

roles

.grant(AppRoles.SCOUT)
.readOwn(AppResource.USER)
.updateOwn(AppResource.USER)

.grant(AppRoles.ADMIN)
.extend(AppRoles.SCOUT)
.createAny(AppResource.USER)
.readAny(AppResource.USER)
.updateAny(AppResource.USER)
.deleteAny(AppResource.USER)
