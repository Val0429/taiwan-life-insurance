/*
 * File: __name@dasherize__.entity.ts
 * File Created: 2023-10-25 10:19:43
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-22 09:25:49
 * Modified By: Val Liu
 * -----
 */

import {
    AddInput,
    CreateDto,
    CreateOutput,
    DeleteDto,
    DeleteOutput,
    ExpandTypeWithLevel,
    GeneralMutationMeta,
    GeneralOutput,
    Normalize,
    OmitFields,
    Prettify,
    PrettifySpecific,
    ReadDto,
    ReadOutput,
    ReplaceC,
    ReplaceD,
    ReplaceR,
    ReplaceU,
    UpdateDto,
    UpdateDtoInternal,
    UpdateOutput,
} from "core/types/base-entity";
import { Prisma } from "@prisma/client";

/// working!
// type ValAtLeast<T extends object> = T extends unknown
//     ? { [K in keyof T]: T[K] } & T
//     : never;

/// general TestVal output type
export type ITestVal = Output;

/// definition - R - Select & Where
export type IReadTestValDto = ReplaceR<ReadDto<Delegate, OSelect>, TRep>;
export type IReadTestValOutput = ReadOutput<Delegate, OSelect>;

/// definition - C - Select & Data
export type ICreateTestValDto = ReplaceC<CreateDto<Delegate, OSelect>, TRep>;
export type ICreateTestValOutput = CreateOutput<Delegate, OSelect>;

/// definition - U - Select & Data & Where
export type IUpdateTestValDto = ReplaceU<UpdateDto<Delegate, OSelect>, TRep>;
export type IUpdateTestValOutput = UpdateOutput<Delegate, OSelect>;

/// definition - D - Select & Where
export type IDeleteTestValDto = ReplaceD<DeleteDto<Delegate, OSelect>, TRep>;
export type IDeleteTestValOutput = DeleteOutput<Delegate, OSelect>;

/// output - readonly
type CreateTestValInput = Pick<Prettify<ICreateTestValDto, 4>, "data">;
type CreateTestValOutput = Prettify<ICreateTestValOutput>;

type ReadTestValInput = Pick<Prettify<IReadTestValDto, 2>, "select">;
type ReadTestValOutput = Prettify<IReadTestValOutput, 3>["results"][0];

type UpdateTestValInput = Pick<Prettify<IUpdateTestValDto, 2>, "data">;
type UpdateTestValOutput = Prettify<IUpdateTestValOutput>;

type DeleteTestValInput = Pick<Prettify<IDeleteTestValDto, 2>, "select">;
type DeleteTestValOutput = Prettify<IDeleteTestValOutput>;

/// private helper: Prisma payload definition
// export type Delegate = Pick<
//     Prisma.TestValDelegate,
//     "create" | "delete" | "findMany" | "update" | typeof Symbol.iterator
// >;
export type Delegate = Prisma.TestValDelegate;
//type OO = Delegate[symbol.iterator]["types"]["payload"]["scalars"]["id"]
type Output = GeneralOutput<Delegate>;

/// Customization /////////////////////////////
// Custom Type

// Type to Omit from Select & Output
type OSelect = undefined;
// The type to replace
type TRep = {};
///////////////////////////////////////////////
