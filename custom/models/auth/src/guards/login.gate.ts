/*
 * File: local-auth.guard.ts
 * File Created: 2023-10-04 11:44:32
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-15 05:39:45
 * Modified By: Val Liu
 * -----
 */

import { Injectable, SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiPublicSecurity } from "./public.gate";

export const LoginGateExists = Symbol("LoginGateExists");

export function LoginGate() {
    return applyDecorators(
        SetMetadata(LoginGateExists, true),
        ApiPublicSecurity,
        UseGuards(PrivateLoginGuard),
    );
}

/// This guard should apply on controller which perform login.
@Injectable()
class PrivateLoginGuard extends AuthGuard("local") {}
