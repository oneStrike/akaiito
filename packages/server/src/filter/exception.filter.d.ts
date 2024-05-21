import { MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import type { HttpResponseResult } from '@akaiito/typings/src';
export declare class ExceptionFilter {
    catch(err: MidwayHttpError, ctx: Context): Promise<HttpResponseResult<any>>;
}
