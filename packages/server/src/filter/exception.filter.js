"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionFilter = void 0;
const core_1 = require("@midwayjs/core");
const log_service_1 = require("../modules/internal/log/log.service");
let ExceptionFilter = class ExceptionFilter {
    async catch(err, ctx) {
        const cause = err.cause;
        const responseErrorInfo = {
            status: 'error',
            data: null
        };
        ctx.logger.error(err);
        if (err.name === 'PrismaClientKnownRequestError' && err.code === 'P2002') {
            responseErrorInfo.code = 0;
            responseErrorInfo.desc = '重复数据';
        }
        else if (cause) {
            responseErrorInfo.code = 0;
            const { context, type } = cause.details[0];
            if (type === 'any.required') {
                responseErrorInfo.desc = `【 ${context.label} 】参数丢失`;
            }
            else {
                responseErrorInfo.desc = `【 ${context.label} 】校验失败！请确认【 ${context.value} 】是否正确`;
            }
        }
        else {
            if (err.name === 'MultipartInvalidFilenameError')
                err.message = '不受支持的文件类型';
            responseErrorInfo.code = err.status;
            switch (err.status) {
                case 400:
                    responseErrorInfo.desc = err.message;
                    break;
                case 401:
                    responseErrorInfo.desc = '鉴权信息缺失';
                    break;
                case 403:
                    responseErrorInfo.desc = '登陆失效，请重新登陆';
                    break;
                case 404:
                    responseErrorInfo.desc = '请求路径错误';
                    break;
                case 500:
                    responseErrorInfo.desc = '内部服务错误';
                    break;
                case 413:
                    responseErrorInfo.desc = '超出大小限制';
                    break;
                default:
                    responseErrorInfo.code = 0;
                    responseErrorInfo.desc = '未知错误';
            }
        }
        err.status = 200;
        ctx.setAttr('responseRes', responseErrorInfo);
        const baseSysLogService = await ctx.requestContext.getAsync(log_service_1.LogService);
        await baseSysLogService.recordLogs(ctx, responseErrorInfo);
        return responseErrorInfo;
    }
};
exports.ExceptionFilter = ExceptionFilter;
exports.ExceptionFilter = ExceptionFilter = __decorate([
    (0, core_1.Catch)()
], ExceptionFilter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmZpbHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImV4Y2VwdGlvbi5maWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVEO0FBR3ZELHFFQUFnRTtBQUd6RCxJQUFNLGVBQWUsR0FBckIsTUFBTSxlQUFlO0lBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBb0IsRUFBRSxHQUFZO1FBQzVDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFZLENBQUE7UUFDOUIsTUFBTSxpQkFBaUIsR0FBRztZQUN4QixNQUFNLEVBQUUsT0FBTztZQUNmLElBQUksRUFBRSxJQUFJO1NBQ1csQ0FBQTtRQUV2QixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNyQixJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssK0JBQStCLElBQUksR0FBRyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztZQUN6RSxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO1lBQzFCLGlCQUFpQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7UUFDakMsQ0FBQzthQUFNLElBQUksS0FBSyxFQUFFLENBQUM7WUFDakIsaUJBQWlCLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQTtZQUMxQixNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUMsSUFBSSxJQUFJLEtBQUssY0FBYyxFQUFFLENBQUM7Z0JBQzVCLGlCQUFpQixDQUFDLElBQUksR0FBRyxLQUFLLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQTtZQUNyRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLEtBQUssT0FBTyxDQUFDLEtBQUssZUFBZSxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUE7WUFDakYsQ0FBQztRQUNILENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxHQUFHLENBQUMsSUFBSSxLQUFLLCtCQUErQjtnQkFDOUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7WUFDM0IsaUJBQWlCLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUE7WUFDbkMsUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ25CLEtBQUssR0FBRztvQkFDTixpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQTtvQkFDcEMsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtvQkFDakMsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQTtvQkFDckMsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtvQkFDakMsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtvQkFDakMsTUFBSztnQkFDUCxLQUFLLEdBQUc7b0JBQ04saUJBQWlCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtvQkFDakMsTUFBSztnQkFDUDtvQkFDRSxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFBO29CQUMxQixpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFBO1lBQ25DLENBQUM7UUFDSCxDQUFDO1FBQ0QsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFFaEIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtRQUM3QyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsd0JBQVUsQ0FBQyxDQUFBO1FBQ3ZFLE1BQU0saUJBQWlCLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFBO1FBQzFELE9BQU8saUJBQWlCLENBQUE7SUFDMUIsQ0FBQztDQUNGLENBQUE7QUF2RFksMENBQWU7MEJBQWYsZUFBZTtJQUQzQixJQUFBLFlBQUssR0FBRTtHQUNLLGVBQWUsQ0F1RDNCIn0=