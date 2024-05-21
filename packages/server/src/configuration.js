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
exports.MainConfiguration = void 0;
const core_1 = require("@midwayjs/core");
const koa = require("@midwayjs/koa");
const validate = require("@midwayjs/validate");
const info = require("@midwayjs/info");
const path_1 = require("path");
const captcha = require("@midwayjs/captcha");
const upload = require("@midwayjs/upload");
const staticFile = require("@midwayjs/static-file");
const report_middleware_1 = require("./middleware/report.middleware");
const jwt_middleware_1 = require("./middleware/jwt.middleware");
const exception_filter_1 = require("./filter/exception.filter");
const prisma_1 = require("./prisma");
const userinfo_decorator_1 = require("./decorator/userinfo.decorator");
let MainConfiguration = class MainConfiguration {
    async onReady(container) {
        this.registerPrisma.register(container);
        container.registerObject('router', await this.webRouterService.getFlattenRouterTable());
        this.app.useMiddleware([report_middleware_1.ReportMiddleware, jwt_middleware_1.JwtMiddleware]);
        this.app.useFilter([exception_filter_1.ExceptionFilter]);
        this.decoratorService.registerMethodHandler(userinfo_decorator_1.USERINFO_KEY, userinfo_decorator_1.getUserInfoHandler);
    }
};
exports.MainConfiguration = MainConfiguration;
__decorate([
    (0, core_1.App)('koa'),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "app", void 0);
__decorate([
    (0, core_1.Logger)(),
    __metadata("design:type", Object)
], MainConfiguration.prototype, "logger", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", prisma_1.RegisterPrisma)
], MainConfiguration.prototype, "registerPrisma", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayDecoratorService)
], MainConfiguration.prototype, "decoratorService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", core_1.MidwayWebRouterService)
], MainConfiguration.prototype, "webRouterService", void 0);
exports.MainConfiguration = MainConfiguration = __decorate([
    (0, core_1.Configuration)({
        imports: [
            koa,
            upload,
            captcha,
            validate,
            staticFile,
            {
                component: info,
                enabledEnvironment: ['local']
            }
        ],
        importConfigs: [(0, path_1.join)(__dirname, './config')]
    })
], MainConfiguration);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBU3VCO0FBQ3ZCLHFDQUFvQztBQUNwQywrQ0FBOEM7QUFDOUMsdUNBQXNDO0FBQ3RDLCtCQUEyQjtBQUMzQiw2Q0FBNEM7QUFDNUMsMkNBQTBDO0FBQzFDLG9EQUFtRDtBQUNuRCxzRUFBaUU7QUFDakUsZ0VBQTJEO0FBQzNELGdFQUEyRDtBQUMzRCxxQ0FBeUM7QUFDekMsdUVBR3VDO0FBZ0JoQyxJQUFNLGlCQUFpQixHQUF2QixNQUFNLGlCQUFpQjtJQWdCNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUEyQjtRQUN2QyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUV2QyxTQUFTLENBQUMsY0FBYyxDQUN0QixRQUFRLEVBQ1IsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsQ0FDcEQsQ0FBQTtRQUVELElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsb0NBQWdCLEVBQUUsOEJBQWEsQ0FBQyxDQUFDLENBQUE7UUFDekQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxrQ0FBZSxDQUFDLENBQUMsQ0FBQTtRQUVyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLENBQ3pDLGlDQUFZLEVBQ1osdUNBQWtCLENBQ25CLENBQUE7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQWhDWSw4Q0FBaUI7QUFFNUI7SUFEQyxJQUFBLFVBQUcsRUFBQyxLQUFLLENBQUM7OzhDQUNTO0FBR3BCO0lBREMsSUFBQSxhQUFNLEdBQUU7O2lEQUNNO0FBR2Y7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTyx1QkFBYzt5REFBQTtBQUc5QjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNTLDZCQUFzQjsyREFBQTtBQUd4QztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNTLDZCQUFzQjsyREFBQTs0QkFkN0IsaUJBQWlCO0lBZDdCLElBQUEsb0JBQWEsRUFBQztRQUNiLE9BQU8sRUFBRTtZQUNQLEdBQUc7WUFDSCxNQUFNO1lBQ04sT0FBTztZQUNQLFFBQVE7WUFDUixVQUFVO1lBQ1Y7Z0JBQ0UsU0FBUyxFQUFFLElBQUk7Z0JBQ2Ysa0JBQWtCLEVBQUUsQ0FBQyxPQUFPLENBQUM7YUFDOUI7U0FDRjtRQUNELGFBQWEsRUFBRSxDQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUM3QyxDQUFDO0dBQ1csaUJBQWlCLENBZ0M3QiJ9