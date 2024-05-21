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
exports.JwtMiddleware = void 0;
const core_1 = require("@midwayjs/core");
const jwt_service_1 = require("../modules/internal/authentication/jwt.service");
let JwtMiddleware = class JwtMiddleware {
    resolve() {
        return async (ctx, next) => {
            const refreshToken = ctx.headers['refresh_token'];
            if (refreshToken && ctx.url.includes('/admin/user/refreshAccessToken')) {
                const payload = await this.jwtService.verify(refreshToken);
                if (typeof payload === 'string' || !payload.refresh)
                    throw Error();
                this.setUserInfoToCtx(ctx, payload);
            }
            else {
                // 判断下有没有校验信息
                const permit = this.permit(ctx);
                if (!ctx.headers['authorization'] && !permit) {
                    throw new core_1.httpError.UnauthorizedError();
                }
                if (!permit) {
                    const token = ctx.headers['authorization'];
                    try {
                        const payload = await this.jwtService.verify(token);
                        if (typeof payload === 'string' || payload.refresh)
                            throw Error();
                        this.setUserInfoToCtx(ctx, payload);
                    }
                    catch (e) {
                        throw new core_1.httpError.UnauthorizedError('登录状态失效');
                    }
                }
            }
            await next();
        };
    }
    setUserInfoToCtx(ctx, payload) {
        ctx.setAttr('summaryUserInfo', {
            userId: payload.id,
            username: payload.username,
            mobile: payload.mobile
        });
    }
    // 配置忽略鉴权的路由地址
    permit(ctx) {
        if (Array.isArray(this.whiteList) && this.whiteList.length) {
            return this.whiteList.includes(ctx.request.path);
        }
        return false;
    }
};
exports.JwtMiddleware = JwtMiddleware;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", jwt_service_1.Jwt)
], JwtMiddleware.prototype, "jwtService", void 0);
__decorate([
    (0, core_1.Config)('jwt.whiteList'),
    __metadata("design:type", Array)
], JwtMiddleware.prototype, "whiteList", void 0);
exports.JwtMiddleware = JwtMiddleware = __decorate([
    (0, core_1.Middleware)()
], JwtMiddleware);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJqd3QubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FNdUI7QUFFdkIsZ0ZBQW9FO0FBSTdELElBQU0sYUFBYSxHQUFuQixNQUFNLGFBQWE7SUFPeEIsT0FBTztRQUNMLE9BQU8sS0FBSyxFQUFFLEdBQVksRUFBRSxJQUFrQixFQUFFLEVBQUU7WUFDaEQsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQVcsQ0FBQTtZQUMzRCxJQUFJLFlBQVksSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxnQ0FBZ0MsQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZFLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUE7Z0JBQzFELElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU87b0JBQUUsTUFBTSxLQUFLLEVBQUUsQ0FBQTtnQkFDbEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtZQUNyQyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sYUFBYTtnQkFDYixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUM3QyxNQUFNLElBQUksZ0JBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO2dCQUN6QyxDQUFDO2dCQUNELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDWixNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFBO29CQUMxQyxJQUFJLENBQUM7d0JBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTt3QkFDbkQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLE9BQU87NEJBQUUsTUFBTSxLQUFLLEVBQUUsQ0FBQTt3QkFDakUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtvQkFDckMsQ0FBQztvQkFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3dCQUNYLE1BQU0sSUFBSSxnQkFBUyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFBO29CQUNqRCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsTUFBTSxJQUFJLEVBQUUsQ0FBQTtRQUNkLENBQUMsQ0FBQTtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxHQUFZLEVBQUUsT0FBc0I7UUFDbkQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtZQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDbEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtTQUN2QixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsY0FBYztJQUNQLE1BQU0sQ0FBQyxHQUFZO1FBQ3hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMzRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbEQsQ0FBQztRQUNELE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztDQUNGLENBQUE7QUFuRFksc0NBQWE7QUFFeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDRyxpQkFBRztpREFBQTtBQUdmO0lBREMsSUFBQSxhQUFNLEVBQUMsZUFBZSxDQUFDOztnREFDTDt3QkFMUixhQUFhO0lBRHpCLElBQUEsaUJBQVUsR0FBRTtHQUNBLGFBQWEsQ0FtRHpCIn0=