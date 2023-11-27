/*
 * File: public-gate.ts
 * File Created: 2023-10-06 09:50:03
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-27 10:00:22
 * Modified By: Val Liu
 * -----
 */

import { UserRole } from "./../user/entities/user.entity";
import { SetMetadata } from "@nestjs/common";
import { asUniqueEnum } from "core/types/base-entity";

export const RoleGateSymbol = Symbol("RoleGateSymbol");

export function RoleGate(...args: asUniqueEnum<UserRole>) {
    return SetMetadata(RoleGateSymbol, args);
}
