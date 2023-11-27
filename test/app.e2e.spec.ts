/*
 * File: app.e2e.spec.ts
 * File Created: 2023-11-10 12:38:28
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-19 02:21:45
 * Modified By: Val Liu
 * -----
 */

import * as path from "path";

import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { ConfigService } from "@nestjs/config";
import { AppHost, AppHostModule } from "@app/app-host";
import { AppModule } from "src/app.module";
import { HttpModule, HttpService } from "@nestjs/axios";
import toBeType from "jest-tobetype";
import { AxiosResponse } from "axios";
import { Prisma } from "@prisma/client";
import { UserService } from "@app/auth/user/user.service";
import { of } from "rxjs/internal/observable/of";
import { PrismaService } from "@app/prisma";

expect.extend(toBeType);

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace jest {
        interface Matchers<R> {
            toBeType(expected: string): CustomMatcherResult;
        }
    }
}

describe("AppController (e2e) CRUD Test", () => {
    let app: INestApplication;
    let config: ConfigService;
    let httpService: HttpService;
    let prismaService: PrismaService;
    let userService: Prisma.UserDelegate;
    let api_prefix: string | undefined;
    let accessToken: string;

    function APIPath(pathstr: string) {
        return path.posix.join("/", String(api_prefix), pathstr);
    }

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule, HttpModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.select(AppHostModule).get(AppHost).set(app);
        await app.init();

        ///
        config = moduleFixture.get(ConfigService);
        api_prefix = config.get<string>("HOST_API_PREFIX");
        httpService = moduleFixture.get(HttpService);
        prismaService = moduleFixture.get(PrismaService);
        userService = moduleFixture.get<Prisma.UserDelegate>(UserService);

        expect(httpService).toBeDefined();
        expect(userService).toBeDefined();
    });

    it("/ (POST) Login", (done) => {
        request(app.getHttpServer())
            .post(APIPath("auth/login"))
            .send({
                username: "Admin",
                password: "Az123567!",
            })
            .expect(201)
            .end((err, res) => {
                if (err) {
                    done(err);
                    return;
                }

                accessToken = res.body.accessToken;
                expect(accessToken).toBeDefined();
                done();
            });
    });

    /// R - paging type error
    it("/ (R-Test) Paging Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                paging: {
                    page: "123",
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.paging.page",
                    reason: "Error on typia.assert(): invalid type on $input.paging.page, expect to be (number | undefined)",
                    expected: "(number | undefined)",
                    value: "123",
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// R - order type error
    it("/ (R-Test) OrderBy Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                orderBy: {
                    page: "123",
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.orderBy.page",
                    reason: "Error on typia.assert(): invalid type on $input.orderBy.page, expect to be undefined",
                    expected: "undefined",
                    value: "123",
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// R - correct paging
    it("/ (R-Test) Paging Success", async () => {
        expect(accessToken).toBeDefined();

        const res = await request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                paging: {
                    page: 1,
                    pageSize: 2,
                },
            })
            .expect(200);

        const body = res.body;
        expect(body).toBeDefined();
        const paging = body.paging;
        expect(paging).toBeDefined();
        expect(paging.page).toEqual(1);
        expect(paging.pageSize).toEqual(2);
        expect(paging.totalPages).toBeGreaterThanOrEqual(1);
        expect(paging.total).toBeGreaterThanOrEqual(1);
        return res;
    });

    /// R - correct orderBy
    it("/ (R-Test) OrderBy Success", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                orderBy: {
                    id: "asc",
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toBeDefined();
                const body = res.body;
                expect(body.orderBy).toBeDefined();
                const orderBy = body.orderBy;
                expect(orderBy.id).toEqual("asc");
            });
    });

    /// R - select type error
    it("/ (R-Test) Select Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                select: {
                    password: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.select.password",
                    reason: "Error on typia.assert(): invalid type on $input.select.password, expect to be undefined",
                    expected: "undefined",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// R - where type error
    it("/ (R-Test) Where Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                where: {
                    id: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.where.id",
                    reason: 'Error on typia.assert(): invalid type on $input.where.id, expect to be (Prisma.StringFilter<"User"> | string | undefined)',
                    expected: '(Prisma.StringFilter<"User"> | string | undefined)',
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
        // .then((res) => {
        //     expect(res.body?.message).toEqual(
        //         "Request body data is not following the promised type.",
        //     );
        //     expect(res.body?.error?.path).toEqual("$input.where.role");
        // });
    });

    /// R - correct where and select
    it("/ (R-Test) Where / Select Success", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .patch(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                select: {
                    id: true,
                    role: true,
                },
                where: {
                    role: "Admin",
                },
            })
            .expect(200)
            .then((res) => {
                expect(res.body).toBeDefined();
                const body = res.body;
                expect(body.results).toBeType("array");
            });
    });

    /// C - data type error
    it("/ (C-Test) Data Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .post(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                data: {
                    password: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.data.password",
                    reason: "Error on typia.assert(): invalid type on $input.data.password, expect to be string",
                    expected: "string",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// C - select type error
    it("/ (C-Test) Select Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .post(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                data: {
                    username: "Admin",
                    password: "123456",
                    role: "Admin",
                },
                select: {
                    username: true,
                    password: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.select.password",
                    reason: "Error on typia.assert(): invalid type on $input.select.password, expect to be undefined",
                    expected: "undefined",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// C - correct create
    it("/ (C-Test) Create Success", async () => {
        expect(accessToken).toBeDefined();

        // const result = {
        //     id: "id",
        //     username: "Admin",
        //     password: "pwd",
        //     role: "Admin",
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        // };
        // jest.spyOn(userService, "create").mockImplementationOnce(() => {
        //     console.log("get called");
        //     return Promise.resolve(result);
        // });
        //jest.spyOn(userService, "create").mockResolvedValueOnce(result);
        //jest.spyOn(prismaService.user, "create").mockResolvedValueOnce(result);
        // let tt = await userService.create({
        //     data: {
        //         username: "Admin",
        //         password: "123456",
        //     },
        // });
        // console.log("tt!", tt);
        //userService.create = jest.fn().mockReturnValueOnce(result);

        return request(app.getHttpServer())
            .post(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                data: {
                    username: "AdminTest",
                    password: "123456",
                    role: "Admin",
                },
                select: {
                    username: true,
                    role: true,
                },
            })
            .expect(201);
    });

    /// U - data type error
    it("/ (U-Test) Data Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .put(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                data: {
                    password: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.data.password",
                    reason: "Error on typia.assert(): invalid type on $input.data.password, expect to be (Prisma.StringFieldUpdateOperationsInput | string | undefined)",
                    expected:
                        "(Prisma.StringFieldUpdateOperationsInput | string | undefined)",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// U - where type error
    it("/ (U-Test) Where Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .put(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                where: {
                    id: true,
                },
                data: {
                    password: "123",
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.where.id",
                    reason: "Error on typia.assert(): invalid type on $input.where.id, expect to be (string | undefined)",
                    expected: "(string | undefined)",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// U - select type error
    it("/ (U-Test) Select Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .put(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                select: {
                    password: true,
                },
                where: {
                    id: "123",
                },
                data: {
                    password: "123",
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.select.password",
                    reason: "Error on typia.assert(): invalid type on $input.select.password, expect to be undefined",
                    expected: "undefined",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// U - correct update
    it("/ (U-Test) Update Success", async () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .put(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                data: {
                    password: "123456",
                },
                select: {
                    username: true,
                    role: true,
                },
                where: {
                    username: "AdminTest",
                },
            })
            .expect(200);
    });

    /// D - where type error
    it("/ (D-Test) Where Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .delete(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                where: {
                    id: true,
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.where.id",
                    reason: "Error on typia.assert(): invalid type on $input.where.id, expect to be (string | undefined)",
                    expected: "(string | undefined)",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// D - select type error
    it("/ (D-Test) Select Type Error", () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .delete(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                select: {
                    password: true,
                },
                where: {
                    id: "123",
                },
            })
            .expect(400, {
                statusCode: 400,
                message: "Request body data is not following the promised type.",
                type: "BadRequestException",
                error: {
                    path: "$input.select.password",
                    reason: "Error on typia.assert(): invalid type on $input.select.password, expect to be undefined",
                    expected: "undefined",
                    value: true,
                    message: "Request body data is not following the promised type.",
                },
            });
    });

    /// D - correct delete
    it("/ (D-Test) Delete Success", async () => {
        expect(accessToken).toBeDefined();

        return request(app.getHttpServer())
            .delete(APIPath("user"))
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                select: {
                    username: true,
                    role: true,
                },
                where: {
                    username: "AdminTest",
                },
            })
            .expect(200);
    });
});
