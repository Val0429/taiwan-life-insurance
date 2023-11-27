/*
 * File: __name@dasherize__.entity.ts
 * File Created: 2023-10-25 10:19:43
 * Author: Val Liu <valuis0429@gmail.com>
 *
 * -----
 * Last Modified: 2023-11-13 10:49:28
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

/// general Property output type
export type IProperty = Output;

/// definition - R - Select & Where
export type IReadPropertyDto = ReplaceR<ReadDto<Delegate, OSelect>, TRep>;
export type IReadPropertyOutput = ReadOutput<Delegate, OSelect>;

/// definition - C - Select & Data
export type ICreatePropertyDto = ReplaceC<CreateDto<Delegate, OSelect>, TRep>;
export type ICreatePropertyOutput = CreateOutput<Delegate, OSelect>;

/// definition - U - Select & Data & Where
export type IUpdatePropertyDto = ReplaceU<UpdateDto<Delegate, OSelect>, TRep>;
export type IUpdatePropertyOutput = UpdateOutput<Delegate, OSelect>;

/// definition - D - Select & Where
export type IDeletePropertyDto = ReplaceD<DeleteDto<Delegate, OSelect>, TRep>;
export type IDeletePropertyOutput = DeleteOutput<Delegate, OSelect>;

/// output - readonly
type CreatePropertyInput = Pick<Prettify<ICreatePropertyDto, 4>, "data">;
type CreatePropertyOutput = Prettify<ICreatePropertyOutput>;

type ReadPropertyInput = Pick<Prettify<IReadPropertyDto, 2>, "select">;
type ReadPropertyOutput = Prettify<IReadPropertyOutput, 3>["results"][0];

type UpdatePropertyInput = Pick<Prettify<IUpdatePropertyDto, 2>, "data">;
type UpdatePropertyOutput = Prettify<IUpdatePropertyOutput>;

type DeletePropertyInput = Pick<Prettify<IDeletePropertyDto, 2>, "select">;
type DeletePropertyOutput = Prettify<IDeletePropertyOutput>;

/// private helper: Prisma payload definition
export type Delegate = Prisma.PropertyDelegate;
type Output = GeneralOutput<Delegate>;

/// Customization /////////////////////////////
// Custom Type

// Type to Omit from Select & Output
type OSelect = undefined;
// The type to replace
type TRep = {};
///////////////////////////////////////////////
