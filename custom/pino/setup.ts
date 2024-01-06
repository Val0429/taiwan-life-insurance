/*
 * File: setup.ts
 * File Created: 2023-11-20 03:37:57
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-12-08 01:30:08
 * Modified By: Val Liu
 * -----
 */

import { LoggerModule } from "nestjs-pino";
import * as pino from "pino";
import "core/utilities/load-env";

const pinoSetup: Parameters<typeof LoggerModule.forRoot>[0] = {
    pinoHttp: {
        level: "trace",
        useLevel: "info",
        timestamp: pino.stdTimeFunctions.isoTime,
        /// every API actions being logged!
        customProps: (req) => {
            const action = `${req.method} ${req.url}`;
            const userId = (req as any)?.user?.id ?? null;
            return { context: "ApiLogger", action, userId };
        },
        transport: {
            targets: [
                /// log into console
                {
                    target: "pino-pretty",
                    level: String(process.env.LOG_LEVEL_CONSOLE),
                    options: {
                        singleLine: true,
                    },
                },
                /// log into file
                {
                    target: "pino/file",
                    level: String(process.env.LOG_LEVEL_FILE),
                    options: {
                        destination: "./src/generated/logs/log.txt",
                        mkdir: true,
                    },
                },
                /// log into mssql - only level > warn
                /// additional param: context, action, err
                /// userId, auditerId, relatedId
                {
                    target: require.resolve("@valuis0429/pino-mssqlserver"),
                    level: String(process.env.LOG_LEVEL_MSSQL),
                    options: {
                        serviceName: "TWBLI",
                        tableName: "Logs",
                        connectionString: sqlUrlToCString(
                            process.env.DATABASE_URL as string,
                        ),
                    },
                },
            ],
        },
    },
};

export { pinoSetup };

function capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

/// translate SqlServer database url into connection string
function sqlUrlToCString(databaseUrl: string) {
    const segments = databaseUrl.split(";");

    /// parse host and port
    const seg1 = segments.shift();
    if (!seg1) throw `database url error: ${databaseUrl}`;
    const [_0, _1, host, port] = [...seg1.matchAll(/^(\w+)\:\/\/(\w+)\:(\d+)/gi)][0];

    /// parse the rest into dictionary
    const dict: any = segments.reduce((final, value) => {
        const [k, v] = value.split("=");
        final[k.toLowerCase()] = v;
        return final;
    }, {});
    const user = dict.user;
    delete dict.user;

    /// concat the subString
    const subString = Object.keys(dict)
        .reduce((final, key) => {
            final.push(`${capitalize(key)}=${dict[key]}`);
            return final;
        }, [] as string[])
        .join(";");

    // concat the connection string
    const connectionString = `Server=${host},${port};User Id=${user};TrustServerCertificate=True;${subString};`;
    return connectionString;
}
