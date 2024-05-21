import { IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { HttpResponseResult } from '@akaiito/typings/src';
export declare class ReportMiddleware implements IMiddleware<Context, NextFunction> {
    resolve(): (ctx: Context, next: NextFunction) => Promise<HttpResponseResult<any>>;
}
