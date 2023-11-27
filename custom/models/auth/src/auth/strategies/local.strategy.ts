/*
 * File: local.strategy.ts
 * File Created: 2023-10-02 12:54:35
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-13 11:02:49
 * Modified By: Val Liu
 * -----
 */

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

/// Strategy for validate username / password from request body
/// The return value of validate is to be saved into req.user
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();
        this.authService.setClsUser(user);
        return user;
    }
}
