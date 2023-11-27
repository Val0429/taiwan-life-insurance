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
import { TestValService, TestValServiceFactory } from "./test-val.service";
import { TestValController } from "./test-val.controller";

@Module({
    controllers: [TestValController],
    providers: [TestValServiceFactory],
    exports: [TestValService],
})
export class TestValModule {}
