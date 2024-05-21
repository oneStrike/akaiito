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
exports.LogService = void 0;
const core_1 = require("@midwayjs/core");
const client_1 = require("@prisma/client");
const basic_service_1 = require("../../../basic/service/basic.service");
const utils_1 = require("../../../utils");
const router_service_1 = require("../router/router.service");
let LogService = class LogService extends basic_service_1.BasicService {
    get model() {
        return this.prismaClient.adminLog;
    }
    async recordLogs(context, report) {
        var _a, _b;
        const { path, method, header, query, request } = context;
        const params = (method === 'POST' ? request.body : query) || {};
        const summaryUserInfo = context.getAttr('summaryUserInfo') || {};
        if (path === '/admin/user/login' && report.data) {
            summaryUserInfo.id = report.data.userInfo.id;
            summaryUserInfo.username = report.data.userInfo.username;
            summaryUserInfo.mobile = report.data.userInfo.mobile;
            params.password = params.password.replace(/./g, '*');
        }
        if (path === '/admin/user/createAdminUser') {
            params.password = (_a = params.password) === null || _a === void 0 ? void 0 : _a.replace(/./g, '*');
            params.confirmPassword = (_b = params.confirmPassword) === null || _b === void 0 ? void 0 : _b.replace(/./g, '*');
        }
        const route = this.routerService.getRoute(path);
        const ip = utils_1.utils.sysUtils.getReqIP(context);
        const ipAddress = utils_1.utils.sysUtils.getIpAddr(ip);
        await this.create({
            summary: typeof route !== 'string' && route ? route.summary : '',
            username: summaryUserInfo.username,
            userId: summaryUserInfo.id,
            mobile: summaryUserInfo.mobile,
            params: JSON.stringify(params),
            ip,
            ipAddress,
            method,
            path,
            statusCode: report.code,
            statusDesc: report.desc,
            userAgent: header['user-agent']
        });
    }
    async getRequestLogs(query) {
        if (query.status === 1) {
            query.where = {
                statusCode: 200
            };
        }
        else if (query.status === 0) {
            query.where = {
                statusCode: {
                    not: 200
                }
            };
        }
        delete query.status;
        return await this.findPage(query);
    }
};
exports.LogService = LogService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.PrismaClient)
], LogService.prototype, "prismaClient", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", router_service_1.RouterService)
], LogService.prototype, "routerService", void 0);
exports.LogService = LogService = __decorate([
    (0, core_1.Provide)()
], LogService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBZ0Q7QUFFaEQsMkNBQXVEO0FBR3ZELHdFQUFtRTtBQUNuRSwwQ0FBc0M7QUFDdEMsNkRBQXdEO0FBR2pELElBQU0sVUFBVSxHQUFoQixNQUFNLFVBQVcsU0FBUSw0QkFBc0I7SUFPcEQsSUFBYyxLQUFLO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUE7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBZ0IsRUFBRSxNQUEwQjs7UUFDM0QsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUE7UUFDeEQsTUFBTSxNQUFNLEdBQ1YsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbEQsTUFBTSxlQUFlLEdBQ25CLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDMUMsSUFBSSxJQUFJLEtBQUssbUJBQW1CLElBQUksTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hELGVBQWUsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFBO1lBQzVDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFBO1lBQ3hELGVBQWUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFBO1lBQ3BELE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3RELENBQUM7UUFDRCxJQUFJLElBQUksS0FBSyw2QkFBNkIsRUFBRSxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsTUFBQSxNQUFNLENBQUMsUUFBUSwwQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQ3JELE1BQU0sQ0FBQyxlQUFlLEdBQUcsTUFBQSxNQUFNLENBQUMsZUFBZSwwQ0FBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ3JFLENBQUM7UUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQyxNQUFNLEVBQUUsR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzQyxNQUFNLFNBQVMsR0FBRyxhQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQVcsQ0FBQTtRQUN4RCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDaEIsT0FBTyxFQUFFLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDaEUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxRQUFRO1lBQ2xDLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFBRTtZQUMxQixNQUFNLEVBQUUsZUFBZSxDQUFDLE1BQU07WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQzlCLEVBQUU7WUFDRixTQUFTO1lBQ1QsTUFBTTtZQUNOLElBQUk7WUFDSixVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUk7WUFDdkIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ3ZCLFNBQVMsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDO1NBQ2hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQW9CO1FBQ3ZDLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUN2QixLQUFLLENBQUMsS0FBSyxHQUFHO2dCQUNaLFVBQVUsRUFBRSxHQUFHO2FBQ2hCLENBQUE7UUFDSCxDQUFDO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQzlCLEtBQUssQ0FBQyxLQUFLLEdBQUc7Z0JBQ1osVUFBVSxFQUFFO29CQUNWLEdBQUcsRUFBRSxHQUFHO2lCQUNUO2FBQ0YsQ0FBQTtRQUNILENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUE7UUFDbkIsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkMsQ0FBQztDQUNGLENBQUE7QUE3RFksZ0NBQVU7QUFFckI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDSyxxQkFBWTtnREFBQTtBQUcxQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNNLDhCQUFhO2lEQUFBO3FCQUxqQixVQUFVO0lBRHRCLElBQUEsY0FBTyxHQUFFO0dBQ0csVUFBVSxDQTZEdEIifQ==