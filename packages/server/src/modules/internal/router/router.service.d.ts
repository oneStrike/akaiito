import { MidwayWebRouterService, type RouterInfo } from '@midwayjs/core';
export declare class RouterService {
    webRouterService: MidwayWebRouterService;
    router: RouterInfo[];
    getRoutes(): Promise<RouterInfo[]>;
    getRoute(path: string): "" | RouterInfo;
}
