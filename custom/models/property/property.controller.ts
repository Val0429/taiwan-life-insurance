/*
 * File: __name@dasherize__.controller.ts
 * File Created: 2023-10-25 10:29:15
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-20 04:12:39
 * Modified By: Val Liu
 * -----
 */

import { Controller, Inject, Logger } from "@nestjs/common";
import { TypedBody } from "@nestia/core";
import { TypedRoute } from "@nestia/core";
import { Prisma } from "@prisma/client";
import { DtoToOutput } from "core/utilities/dto-to-output";
import { PropertyService } from "./property.service";
import {
    ICreatePropertyDto,
    ICreatePropertyOutput,
    IDeletePropertyDto,
    IDeletePropertyOutput,
    IReadPropertyDto,
    IReadPropertyOutput,
    IUpdatePropertyDto,
    IUpdatePropertyOutput,
} from "./entities/property.entity";

@Controller("property")
export class PropertyController {
    private readonly logger = new Logger(PropertyController.name);

    constructor(
        @Inject(PropertyService)
        private readonly propertyService: Prisma.PropertyDelegate,
    ) {}

    @TypedRoute.Post()
    create(@TypedBody() createPropertyDto: ICreatePropertyDto): Promise<ICreatePropertyOutput> {
        return DtoToOutput("POST", createPropertyDto, this.propertyService);
    }

    @TypedRoute.Patch()
    read(@TypedBody() readPropertyDto: IReadPropertyDto): Promise<IReadPropertyOutput> {
        return DtoToOutput("GET", readPropertyDto, this.propertyService);
    }

    @TypedRoute.Put()
    update(@TypedBody() updatePropertyDto: IUpdatePropertyDto): Promise<IUpdatePropertyOutput> {
        return DtoToOutput("PUT", updatePropertyDto, this.propertyService);
    }

    @TypedRoute.Delete()
    delete(@TypedBody() deletePropertyDto: IDeletePropertyDto): Promise<IDeletePropertyOutput> {
        return DtoToOutput("DELETE", deletePropertyDto, this.propertyService);
    }
}
