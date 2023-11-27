/*
 * File: __name@dasherize__.controller.ts
 * File Created: 2023-10-25 10:29:15
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-17 10:13:20
 * Modified By: Val Liu
 * -----
 */

import { Controller, Inject } from "@nestjs/common";
import { TypedBody } from "@nestia/core";
import { TypedRoute } from "@nestia/core";
import { Prisma } from "@prisma/client";
import { DtoToOutput } from "core/utilities/dto-to-output";
import { TestValService } from "./test-val.service";
import {
    ICreateTestValDto,
    ICreateTestValOutput,
    IDeleteTestValDto,
    IDeleteTestValOutput,
    IReadTestValDto,
    IReadTestValOutput,
    IUpdateTestValDto,
    IUpdateTestValOutput,
} from "./entities/test-val.entity";
import { PublicGate } from "@app/auth/guards/public.gate";
import { RoleGate } from "@app/auth/guards/role.gate";

@Controller("test-val")
@RoleGate("Admin", "User")
export class TestValController {
    constructor(
        @Inject(TestValService)
        private readonly testValService: Prisma.TestValDelegate,
    ) {}

    @TypedRoute.Post()
    create(
        @TypedBody() createTestValDto: ICreateTestValDto,
    ): Promise<ICreateTestValOutput> {
        return DtoToOutput("POST", createTestValDto, this.testValService);
    }

    @TypedRoute.Patch()
    async read(
        @TypedBody() readTestValDto: IReadTestValDto,
    ): Promise<IReadTestValOutput> {
        return DtoToOutput("GET", readTestValDto, this.testValService);
    }

    @TypedRoute.Put()
    update(
        @TypedBody() updateTestValDto: IUpdateTestValDto,
    ): Promise<IUpdateTestValOutput> {
        return DtoToOutput("PUT", updateTestValDto, this.testValService);
    }

    @TypedRoute.Delete()
    delete(
        @TypedBody() deleteTestValDto: IDeleteTestValDto,
    ): Promise<IDeleteTestValOutput> {
        return DtoToOutput("DELETE", deleteTestValDto, this.testValService);
    }
}
