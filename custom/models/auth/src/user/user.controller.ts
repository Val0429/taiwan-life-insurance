/*
 * File: user.controller.ts
 * File Created: 2023-09-21 09:31:58
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-11-19 08:53:38
 * Modified By: Val Liu
 * -----
 */

import { BadRequestException, Controller, Inject, Logger } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypedBody, TypedRoute } from "@nestia/core";
import { Prisma } from "@prisma/client";
import { DtoToOutput } from "core/utilities/dto-to-output";
import {
    ICreateUserDto,
    ICreateUserOutput,
    IDeleteUserDto,
    IDeleteUserOutput,
    IReadUserDto,
    IReadUserOutput,
    IUpdateUserDto,
    IUpdateUserOutput,
} from "./entities/user.entity";

@Controller("user")
export class UserController {
    private readonly logger = new Logger(UserController.name);

    constructor(@Inject(UserService) private readonly userService: Prisma.UserDelegate) {}

    @TypedRoute.Post()
    async create(@TypedBody() createUserDto: ICreateUserDto): Promise<ICreateUserOutput> {
        /// Encrypt password field
        createUserDto.data.password = this.userService.encryptPassword(
            createUserDto.data.password,
        );
        try {
            const rtn: ICreateUserOutput = await DtoToOutput(
                "POST",
                createUserDto,
                this.userService,
            );
            return rtn;
        } catch (e) {
            /// catch duplicated username
            if (e.code === "P2002")
                throw new BadRequestException("Username already exists");
            throw e;
        }
    }

    @TypedRoute.Patch()
    async read(@TypedBody() readUserDto: IReadUserDto): Promise<IReadUserOutput> {
        return await DtoToOutput("GET", readUserDto, this.userService);
    }

    @TypedRoute.Put()
    update(@TypedBody() updateUserDto: IUpdateUserDto): Promise<IUpdateUserOutput> {
        /// Encrypt password field
        const fieldPwd = updateUserDto.data.password;
        if (fieldPwd != undefined) {
            const inputPwd = typeof fieldPwd === "string" ? fieldPwd : fieldPwd.set;
            updateUserDto.data.password = this.userService.encryptPassword(
                String(inputPwd),
            );
        }
        return DtoToOutput("PUT", updateUserDto, this.userService);
    }

    @TypedRoute.Delete()
    delete(@TypedBody() deleteUserDto: IDeleteUserDto): Promise<IDeleteUserOutput> {
        return DtoToOutput("DELETE", deleteUserDto, this.userService);
    }
}
