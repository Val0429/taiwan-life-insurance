/*
 * File: app.module.ts
 * File Created: 2023-09-21 08:12:46
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-12-04 09:42:34
 * Modified By: Val Liu
 * -----
 */

import { Module } from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { TypiaTypeErrorFilter } from "core/filters/typia-type-error.filter";
import { GenericErrorFilter } from "core/filters/generic-error.filter";
import { AppHostModule } from "@app/app-host";
import { SwaggerModule } from "@app/swagger";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "@app/prisma";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ClsModule } from "nestjs-cls";
import { LoggerErrorInterceptor, LoggerModule } from "nestjs-pino";
import { pinoSetup } from "./custom/pino/setup";
// deprecated: no need to set restful default now
//import { RestfulDefaultTypeMiddleware } from "core/middlewares/restful-default-type.middleware";

/// change this only if custom auth changes the guards. (not likely)
import { UserModule, AuthModule } from "./custom/models/auth/src";
import { JwtAuthGuard } from "@app/auth/guards/jwt-auth.guard";
import { RoleGuard } from "@app/auth/guards/role.guard";

/// custom modules
import { PropertyModule } from "./custom/models/property/property.module";

@Module({
    imports: [
        /// Core Modules
        ConfigModule.forRoot({ isGlobal: true, envFilePath: [".env", "src/.env"] }),
        LoggerModule.forRoot(pinoSetup),
        AppHostModule,
        ClsModule.forRoot({ global: true, middleware: { mount: true } }),
        PrismaModule,
        SwaggerModule,

        /// Custom Modules
        UserModule,
        AuthModule,
        PropertyModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_FILTER, useClass: GenericErrorFilter },
        { provide: APP_FILTER, useClass: TypiaTypeErrorFilter },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
        { provide: APP_GUARD, useClass: RoleGuard },
        { provide: APP_INTERCEPTOR, useClass: LoggerErrorInterceptor },
    ],
})
export class AppModule {
    // implements NestModule {
    /// Val: removed the middleware get GET request default value
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(RestfulDefaultTypeMiddleware).forRoutes("*");
    // }
}
