import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { JwtAuthGuard, RoleGuard } from "../../auth/guards";

export const Auth = (...roles :Role[]) =>
    applyDecorators(
        UseGuards(JwtAuthGuard, ACGuard, RoleGuard),
        UseRoles(...roles),
        ApiBearerAuth()
    )