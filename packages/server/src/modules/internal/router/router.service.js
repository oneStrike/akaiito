"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterService = void 0;
const core_1 = require("@midwayjs/core");
let RouterService = class RouterService {
    async getRoutes() {
        return this.router;
    }
    getRoute(path) {
        if (!Array.isArray(this.router) || !this.router.length)
            return '';
        return this.router.find((item) => item.fullUrl === path);
    }
};
exports.RouterService = RouterService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayWebRouterService)
], RouterService.prototype, "webRouterService", void 0);
__decorate([
    (0, core_1.Inject)('router'),
    __metadata("design:type", Array)
], RouterService.prototype, "router", void 0);
exports.RouterService = RouterService = __decorate([
    (0, core_1.Provide)()
], RouterService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyb3V0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FLdUI7QUFHaEIsSUFBTSxhQUFhLEdBQW5CLE1BQU0sYUFBYTtJQU94QixLQUFLLENBQUMsU0FBUztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO1lBQUUsT0FBTyxFQUFFLENBQUE7UUFDakUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQTtJQUMxRCxDQUFDO0NBQ0YsQ0FBQTtBQWZZLHNDQUFhO0FBRXhCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1MsNkJBQXNCO3VEQUFBO0FBR3hDO0lBREMsSUFBQSxhQUFNLEVBQUMsUUFBUSxDQUFDOzs2Q0FDRzt3QkFMVCxhQUFhO0lBRHpCLElBQUEsY0FBTyxHQUFFO0dBQ0csYUFBYSxDQWV6QiJ9