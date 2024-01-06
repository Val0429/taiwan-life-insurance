/*
 * File: seed.ts
 * File Created: 2023-09-26 09:51:31
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-12-20 01:09:57
 * Modified By: Val Liu
 * -----
 */

import { PrismaClient } from "@prisma/client";
import { AESEncrypt } from "@/../core/utilities/string/aes-crypto";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.upsert({
        where: { username: "Admin" },
        update: {},
        create: {
            username: "Admin",
            password: AESEncrypt("Az123567!"),
            role1: "Admin",
            name: "預設管理者",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
