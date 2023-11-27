/*
 * File: jwt-auth.guard.ts
 * File Created: 2023-10-04 03:45:23
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-27 10:00:38
 * Modified By: Val Liu
 * -----
 */

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RoleGateSymbol } from "./role.gate";
import { UserRole } from "./../user/entities/user.entity";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<UserRole[]>(RoleGateSymbol, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!roles) return true;

        /// check user role
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.matchRoles(roles, user.role);
    }

    /// private helper
    matchRoles(permitRoles: UserRole[], userRole: UserRole | undefined) {
        if (userRole == undefined) return false;
        return permitRoles.indexOf(userRole) >= 0;
    }
}
