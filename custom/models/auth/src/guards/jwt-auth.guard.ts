/*
 * File: jwt-auth.guard.ts
 * File Created: 2023-10-04 03:45:23
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-15 05:39:49
 * Modified By: Val Liu
 * -----
 */

/*
 * File: jwt-auth.guard.ts
 * File Created: 2023-10-04 03:45:23
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 09:41:28
 * Modified By: Val Liu
 * -----
 */

import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { LoginGateExists } from "./login.gate";
import { PublicGateExists } from "./public.gate";
import { RoleGateSymbol } from "./role.gate";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const public_exists = this.reflector.getAllAndOverride<boolean>(
            PublicGateExists,
            [context.getHandler(), context.getClass()],
        );
        const login_exists = this.reflector.getAllAndOverride<boolean>(LoginGateExists, [
            context.getHandler(),
            context.getClass(),
        ]);
        const roles_exists = this.reflector.getAllAndOverride<boolean>(RoleGateSymbol, [
            context.getHandler(),
            context.getClass(),
        ]);

        /// make guard passes if defined LoginGate or PublicGate.
        const exists = public_exists || login_exists;
        /// if roles exists, assign user for next guard
        if (exists && !roles_exists) return true;

        return super.canActivate(context);
    }
}
