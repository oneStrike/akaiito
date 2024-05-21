"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const log_service_1 = require("../modules/internal/log/log.service");
let ReportMiddleware = class ReportMiddleware {
    resolve() {
        return async (ctx, next) => {
            // 调用下一个中间件或路由处理函数
            const result = await next();
            // 获取日志服务实例
            const sysLogService = await ctx.requestContext.getAsync(log_service_1.LogService);
            const reportRes = {
                code: 200,
                status: 'success',
                data: result !== null && result !== void 0 ? result : null,
                desc: 'success'
            };
            // 记录日志
            await sysLogService.recordLogs(ctx, reportRes);
            if (result === null) {
                ctx.status = 200;
            }
            // 返回给上一个中间件的结果
            return reportRes;
        };
    }
};
exports.ReportMiddleware = ReportMiddleware;
exports.ReportMiddleware = ReportMiddleware = __decorate([
    (0, core_1.Middleware)()
], ReportMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZXBvcnQubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBd0Q7QUFFeEQscUVBQWdFO0FBSXpELElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWdCO0lBQzNCLE9BQU87UUFDTCxPQUFPLEtBQUssRUFBRSxHQUFZLEVBQUUsSUFBa0IsRUFBRSxFQUFFO1lBQ2hELGtCQUFrQjtZQUNsQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFBO1lBRTNCLFdBQVc7WUFDWCxNQUFNLGFBQWEsR0FBRyxNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLHdCQUFVLENBQUMsQ0FBQTtZQUVuRSxNQUFNLFNBQVMsR0FBdUI7Z0JBQ3BDLElBQUksRUFBRSxHQUFHO2dCQUNULE1BQU0sRUFBRSxTQUFTO2dCQUNqQixJQUFJLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksSUFBSTtnQkFDcEIsSUFBSSxFQUFFLFNBQVM7YUFDaEIsQ0FBQTtZQUVELE9BQU87WUFDUCxNQUFNLGFBQWEsQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBRTlDLElBQUksTUFBTSxLQUFLLElBQUksRUFBRSxDQUFDO2dCQUNwQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtZQUNsQixDQUFDO1lBRUQsZUFBZTtZQUNmLE9BQU8sU0FBUyxDQUFBO1FBQ2xCLENBQUMsQ0FBQTtJQUNILENBQUM7Q0FDRixDQUFBO0FBM0JZLDRDQUFnQjsyQkFBaEIsZ0JBQWdCO0lBRDVCLElBQUEsaUJBQVUsR0FBRTtHQUNBLGdCQUFnQixDQTJCNUIifQ==