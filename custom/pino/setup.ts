/*
 * File: setup.ts
 * File Created: 2023-11-20 03:37:57
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-20 03:53:15
 * Modified By: Val Liu
 * -----
 */

import { LoggerModule } from "nestjs-pino";

const pinoSetup: Parameters<typeof LoggerModule.forRoot>[0] = {
    pinoHttp: {
        transport: {
            targets: [
                {
                    target: "pino-pretty",
                    level: String(process.env.LOG_LEVEL_CONSOLE),
                    options: {
                        singleLine: true,
                    },
                },
                {
                    target: "pino/file",
                    level: String(process.env.LOG_LEVEL_FILE),
                    options: {
                        destination: "./src/generated/logs/log.txt",
                        mkdir: true,
                    },
                },
            ],
        },
    },
};

export { pinoSetup };
