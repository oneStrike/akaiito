"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfoHandler = exports.UserInfo = exports.USERINFO_KEY = void 0;
const core_1 = require("@midwayjs/core");
const user_service_1 = require("../modules/admin/user/user.service");
const jwt_service_1 = require("../modules/internal/authentication/jwt.service");
exports.USERINFO_KEY = 'decorator:userinfo_key';
/**
 * 获取用户信息装饰器，获取成功后会保存至请求上下文中，Context.getAttr('userInfo')获取
 * @constructor
 */
function UserInfo() {
    return (0, core_1.createCustomMethodDecorator)(exports.USERINFO_KEY, {});
}
exports.UserInfo = UserInfo;
function getUserInfoHandler() {
    return {
        async before(joinPoint) {
            const instance = joinPoint.target;
            const ctx = instance[core_1.REQUEST_OBJ_CTX_KEY];
            const authorization = ctx.request.headers.authorization;
            if (authorization) {
                const jwtServer = await ctx.requestContext.getAsync(jwt_service_1.Jwt);
                const userService = await ctx.requestContext.getAsync(user_service_1.UserService);
                const payload = await jwtServer.verify(authorization);
                const userInfo = await userService.findUnique({ id: payload.id });
                ctx.setAttr('userInfo', userInfo);
            }
        }
    };
}
exports.getUserInfoHandler = getUserInfoHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcmluZm8uZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlcmluZm8uZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlDQUt1QjtBQUN2QixxRUFBZ0U7QUFDaEUsZ0ZBQW9FO0FBRXZELFFBQUEsWUFBWSxHQUFHLHdCQUF3QixDQUFBO0FBRXBEOzs7R0FHRztBQUNILFNBQWdCLFFBQVE7SUFDdEIsT0FBTyxJQUFBLGtDQUEyQixFQUFDLG9CQUFZLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDdEQsQ0FBQztBQUZELDRCQUVDO0FBRUQsU0FBZ0Isa0JBQWtCO0lBQ2hDLE9BQU87UUFDTCxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQW9CO1lBQy9CLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUE7WUFDakMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLDBCQUFtQixDQUFDLENBQUE7WUFDekMsTUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFBO1lBQ3ZELElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsaUJBQUcsQ0FBQyxDQUFBO2dCQUN4RCxNQUFNLFdBQVcsR0FBRyxNQUFNLEdBQUcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLDBCQUFXLENBQUMsQ0FBQTtnQkFDbEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUNyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQ2pFLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFBO1lBQ25DLENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQTtBQUNILENBQUM7QUFmRCxnREFlQyJ9