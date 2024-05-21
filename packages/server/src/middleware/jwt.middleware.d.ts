import { IMiddleware } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { Jwt } from '../modules/internal/authentication/jwt.service';
import { IterateObject } from '@akaiito/typings/src';
export declare class JwtMiddleware implements IMiddleware<Context, NextFunction> {
    jwtService: Jwt;
    whiteList: string[];
    resolve(): (ctx: Context, next: NextFunction) => Promise<void>;
    setUserInfoToCtx(ctx: Context, payload: IterateObject): void;
    permit(ctx: Context): boolean;
}
