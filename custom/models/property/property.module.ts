/*
 * File: __name@dasherize__.module.ts
 * File Created: 2023-10-25 10:24:18
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-25 05:25:02
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { PropertyService, PropertyServiceFactory,
} from "./property.service";
import { PropertyController } from "./property.controller";

@Module({
    controllers: [PropertyController],
    providers: [PropertyServiceFactory],
    exports: [PropertyService],
})
export class PropertyModule {}
