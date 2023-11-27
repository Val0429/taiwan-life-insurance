/*
 * File: jwt-payload.interface.ts
 * File Created: 2023-10-04 02:30:53
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-04 02:31:55
 * Modified By: Val Liu
 * -----
 */

import { User } from "@prisma/client";

export type IJwtPayload = Pick<User, "id" | "username">;
