/*
 * File: app.controller.ts
 * File Created: 2023-09-20 08:27:25
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-05 05:03:36
 * Modified By: Val Liu
 * -----
 */

import { Controller } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
}
