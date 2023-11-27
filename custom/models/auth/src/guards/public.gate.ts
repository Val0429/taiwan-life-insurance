/*
 * File: public-gate.ts
 * File Created: 2023-10-06 09:50:03
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-10-11 10:11:28
 * Modified By: Val Liu
 * -----
 */

import { SetMetadata, applyDecorators } from "@nestjs/common";
import { ApiSecurity } from "@nestjs/swagger";

export const PublicGateExists = Symbol("PublicGateExists");
export const PublicKeyword = "public";
export const ApiPublicSecurity = ApiSecurity(PublicKeyword);

export function PublicGate() {
    return applyDecorators(SetMetadata(PublicGateExists, true), ApiPublicSecurity);
}
