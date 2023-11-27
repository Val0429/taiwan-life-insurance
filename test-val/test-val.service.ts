/*
 * File: __name@dasherize__.service.ts
 * File Created: 2023-10-25 10:27:42
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-31 04:33:24
 * Modified By: Val Liu
 * -----
 */

import { createServiceFactory } from "core/utilities/create-service-factory";

export const TestValService = Symbol("TestValService");

export const TestValServiceFactory = createServiceFactory({
    provide: TestValService,
    model: "testVal",
});

// /// Extend TemplateService
// declare module "@prisma/client" {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     export namespace Prisma {
//         export interface TestValDelegate {
//         }
//     }
// }
