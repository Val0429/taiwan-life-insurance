/*
 * File: auth.module.ts
 * File Created: 2023-09-26 12:46:38
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-27 09:59:05
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserModule } from "./../user/user.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.AUTH_JWT_SECRET,
            signOptions: { expiresIn: process.env.AUTH_JWT_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
