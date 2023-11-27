/*
 * File: main.ts
 * File Created: 2023-09-20 08:27:25
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-19 02:31:37
 * Modified By: Val Liu
 * -----
 */

import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AppHost, AppHostModule } from "@app/app-host";
import { detectSSL } from "core/private/detect-ssl";
import { detectLogger } from "core/private/detect-logger";

async function bootstrap() {
    /// Create App
    const app = await NestFactory.create(AppModule, detectSSL(detectLogger()));

    /// AppHost
    const appHost = app.select(AppHostModule).get(AppHost);
    appHost.set(app);

    /// Start Server
    const HOST_PORT: number = Number(
        appHost.env === "production" ? process.env.HOST_PORT : 3000,
    );
    await app.listen(HOST_PORT);
}
bootstrap();
