/*
 * File: user.entity.ts
 * File Created: 2023-09-21 08:16:46
 * Author: Val Liu (valuis0429@gmail.com)
 *
 * -----
 * Last Modified: 2023-11-08 02:47:09
 * Modified By: Val Liu
 * -----
 */

import {
    CreateDto,
    CreateOutput,
    DeleteDto,
    DeleteOutput,
    GeneralOutput,
    Prettify,
    ReadDto,
    ReadOutput,
    ReplaceC,
    ReplaceD,
    ReplaceR,
    ReplaceU,
    UpdateDto,
    UpdateOutput,
} from "core/types/base-entity";
import { Prisma } from "@prisma/client";

export type IUser = Output;

/// definition - C - Select & Data
export type ICreateUserDto = ReplaceC<CreateDto<Delegate, OSelect>, TRep>;
export type ICreateUserOutput = CreateOutput<Delegate, OSelect>;

/// definition - U - Select & Data & Where
export type IUpdateUserDto = ReplaceU<UpdateDto<Delegate, OSelect, "username">, TRep>;
export type IUpdateUserOutput = UpdateOutput<Delegate, OSelect>;

/// definition - R - Select & Where
export type IReadUserDto = ReplaceR<ReadDto<Delegate, OSelect>, TRep>;
export type IReadUserOutput = ReadOutput<Delegate, OSelect>;

/// definition - D - Select & Where
export type IDeleteUserDto = ReplaceD<DeleteDto<Delegate, OSelect>, TRep>;
export type IDeleteUserOutput = DeleteOutput<Delegate, OSelect>;

/// output - readonly
type CreateUserInput = Pick<Prettify<ICreateUserDto, 2>, "data" | "select">;
type CreateUserOutput = Prettify<ICreateUserOutput>;

type ReadUserInput = Pick<Prettify<IReadUserDto, 2>, "select">;
type ReadUserOutput = Prettify<IReadUserOutput, 3>["results"][0];

type UpdateUserInput = Pick<Prettify<IUpdateUserDto, 2>, "where" | "data">;
type UpdateUserOutput = Prettify<IUpdateUserOutput>;

type DeleteUserInput = Pick<Prettify<IDeleteUserDto, 2>, "select">;
type DeleteUserOutput = Prettify<IDeleteUserOutput>;

/// Customization /////////////////////////////
// Custom Type
export enum UserRole {
    Admin = "Admin",
    User = "User",
}

// Type to Omit from Select & Output
type OSelect = "password";
// The type to replace
type TRep = {
    role: UserRole;
};
///////////////////////////////////////////////

/// private helper: Prisma payload definition
export type Delegate = Prisma.UserDelegate;
type Output = GeneralOutput<Delegate>;
