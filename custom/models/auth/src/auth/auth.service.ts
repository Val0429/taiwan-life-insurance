/*
 * File: auth.service.ts
 * File Created: 2023-09-26 12:46:38
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-27 09:59:45
 * Modified By: Val Liu
 * -----
 */

import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma, User } from "@prisma/client";
import { IJwtPayload } from "./types/jwt-payload.interface";
import { IJwtAccessToken } from "./types/jwt-access-token.interface";
import { ClsService } from "nestjs-cls";
import { UserCls } from "./types/auth.symbol";
import { UserService } from "./../user";

export interface ILoginDto {
    /**
     * @default Admin
     */
    username: string;
    /**
     * @default Az123567!
     */
    password: string;
}

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly userService: Prisma.UserDelegate,
        private readonly clsService: ClsService,
        private readonly jwtService: JwtService,
    ) {}

    /// validate username / password and return the User.
    /// Used by LocalStrategy, validate user into req.user.
    async validateUser(username: string, password: string): Promise<User | null> {
        /// find the user
        const user = await this.userService.findFirst({
            where: { username },
        });

        /// validate
        if (user && this.userService.decryptPassword(user.password) === password) {
            return user;
        }
        return null;
    }

    /// Used by JWT Strategy, find id from payload for User.
    async findUser(id: User["id"]): Promise<User | null> {
        const user = await this.userService.findFirst({
            where: { id },
        });
        return user;
    }

    /// Perform login and return access token.
    /// Used by login route.
    login(user: User): IJwtAccessToken {
        const { username, id } = user;
        const payload: IJwtPayload = { id, username };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    /// assign User into CLS
    setClsUser(user: User) {
        this.clsService.set(UserCls, user);
    }
}
