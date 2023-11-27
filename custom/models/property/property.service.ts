/*
 * File: __name@dasherize__.service.ts
 * File Created: 2023-10-25 10:27:42
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-31 04:35:47
 * Modified By: Val Liu
 * -----
 */

import { createServiceFactory } from "core/utilities/create-service-factory";

export const PropertyService = Symbol("PropertyService");

export const PropertyServiceFactory = createServiceFactory({
    provide: PropertyService,
    model: "property",
});

// /// Extend TemplateService
// declare module "@prisma/client" {
//     // eslint-disable-next-line @typescript-eslint/no-namespace
//     export namespace Prisma {
//         export interface PropertyDelegate {
//         }
//     }
// }
