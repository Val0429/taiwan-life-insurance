/*
 * File: user.module.ts
 * File Created: 2023-09-21 08:13:06
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-13 07:56:38
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { UserServiceFactory, UserService } from "./user.service";
import { UserController } from "./user.controller";

@Module({
    controllers: [UserController],
    providers: [UserServiceFactory],
    exports: [UserService],
})
export class UserModule {}
