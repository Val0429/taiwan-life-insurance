/*
 * File: auth.controller.ts
 * File Created: 2023-10-04 11:30:27
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-17 10:35:41
 * Modified By: Val Liu
 * -----
 */

import { Controller } from "@nestjs/common";
import { LoginGate } from "../guards/login.gate";
import { AuthService, ILoginDto } from "./auth.service";
import { CurrentUser } from "core/decorators/current-user.decorator";
import { User } from "@prisma/client";
import { TypedBody, TypedRoute } from "@nestia/core";
import { IJwtAccessToken } from "./types/jwt-access-token.interface";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @LoginGate()
    @TypedRoute.Post("login")
    login(
        @CurrentUser() user: User,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        @TypedBody() loginDto: ILoginDto,
    ): IJwtAccessToken {
        return this.authService.login(user);
    }
}
