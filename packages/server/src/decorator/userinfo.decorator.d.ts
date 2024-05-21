import { IMethodAspect } from '@midwayjs/core';
export declare const USERINFO_KEY = "decorator:userinfo_key";
/**
 * 获取用户信息装饰器，获取成功后会保存至请求上下文中，Context.getAttr('userInfo')获取
 * @constructor
 */
export declare function UserInfo(): MethodDecorator;
export declare function getUserInfoHandler(): IMethodAspect;
