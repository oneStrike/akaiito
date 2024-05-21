import { ILogger, IMidwayContainer, MidwayDecoratorService, MidwayWebRouterService } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import { RegisterPrisma } from './prisma';
export declare class MainConfiguration {
    app: koa.Application;
    logger: ILogger;
    registerPrisma: RegisterPrisma;
    decoratorService: MidwayDecoratorService;
    webRouterService: MidwayWebRouterService;
    onReady(container: IMidwayContainer): Promise<void>;
}
