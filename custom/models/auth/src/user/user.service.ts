/*
 * File: user.service.ts
 * File Created: 2023-09-21 08:13:06
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-10-25 08:36:11
 * Modified By: Val Liu
 * -----
 */

import { AESDecrypt, AESEncrypt } from "core/utilities/aes-crypto";
import { createServiceFactory } from "core/utilities/create-service-factory";

export const UserService = Symbol("UserService");

/// Extend UserService
declare module "@prisma/client" {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    export namespace Prisma {
        export interface UserDelegate {
            encryptPassword(password: string): string;
            decryptPassword(encrypted: string): string;
        }
    }
}

export const UserServiceFactory = createServiceFactory({
    provide: UserService,
    model: "user",
    assignments: {
        encryptPassword: (password: string) => {
            return AESEncrypt(password);
        },
        decryptPassword: (encrypted: string) => {
            return AESDecrypt(encrypted);
        },
    },
});
