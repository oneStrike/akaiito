import * as jwt from 'jsonwebtoken';
import type { IterateObject } from '@akaiito/typings/src';
export declare class Jwt {
    jwtConfig: any;
    sign(payload: string | IterateObject, options?: jwt.SignOptions, secret?: string): Promise<string>;
    verify(token: string, secretOrPublicKey?: string, options?: jwt.VerifyOptions): Promise<string | jwt.JwtPayload>;
}
