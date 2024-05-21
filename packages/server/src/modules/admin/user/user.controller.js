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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const core_1 = require("@midwayjs/core");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
const userinfo_decorator_1 = require("../../../decorator/userinfo.decorator");
const basic_dto_1 = require("../../../basic/dto/basic.dto");
let UserController = class UserController {
    async login(body) {
        return this.userService.login(body);
    }
    async createUser(body) {
        return await this.userService.createUser(body);
    }
    async getUserInfo(query) {
        const id = query.id || this.ctx.getAttr('userId');
        return this.userService.findUnique({ where: { id } });
    }
    async getUserPage(query) {
        return this.userService.findPage({
            ...query,
            fuzzy: ['username', 'mobile'],
            excludes: ['password']
        });
    }
    async updateUser(body) {
        const user = this.ctx.getAttr('userInfo');
        return this.userService.updateUserInfo(body, user, 'info');
    }
    async deleteAdminUser(body) {
        const user = this.ctx.getAttr('userInfo');
        return this.userService.deleteAdminUser(body, user);
    }
    async updateAdminUserPassword(body) {
        const user = this.ctx.getAttr('userInfo');
        return this.userService.updateUserPwd(body, user);
    }
    async updateUserStatus(body) {
        const user = this.ctx.getAttr('userInfo');
        return this.userService.updateUserInfo(body, user);
    }
    async refreshAccessToken(body) {
        const userInfo = this.ctx.getAttr('userInfo');
        return this.userService.refreshAccessToken(body.accessToken, userInfo);
    }
};
exports.UserController = UserController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", user_service_1.UserService)
], UserController.prototype, "userService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], UserController.prototype, "ctx", void 0);
__decorate([
    (0, core_1.Post)('/login', { summary: '登录' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserLoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, core_1.Post)('/createAdminUser', { summary: '创建管理员' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, core_1.Get)('/getUserInfo', { summary: '获取管理员信息' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, core_1.Get)('/getUserPage', { summary: '获取管理员列表' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserPageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserPage", null);
__decorate([
    (0, core_1.Post)('/updateAdminUserInfo', { summary: '更新用户信息' }),
    (0, userinfo_decorator_1.UserInfo)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, core_1.Post)('/deleteAdminUser', { summary: '删除管理员' }),
    (0, userinfo_decorator_1.UserInfo)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteAdminUser", null);
__decorate([
    (0, core_1.Post)('/updateAdminUserPassword', { summary: '修改密码' }),
    (0, userinfo_decorator_1.UserInfo)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserPwd]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAdminUserPassword", null);
__decorate([
    (0, core_1.Post)('/updateAdminUserStatus', { summary: '启用或者禁用管理员' }),
    (0, userinfo_decorator_1.UserInfo)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdStatusDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUserStatus", null);
__decorate([
    (0, core_1.Post)('/refreshAccessToken', { summary: '刷新accessToken' }),
    (0, userinfo_decorator_1.UserInfo)(),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.RefreshAccessTokenDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refreshAccessToken", null);
exports.UserController = UserController = __decorate([
    (0, core_1.Controller)('/admin/user', {
        tagName: '管理员',
        description: '管理平台的用户管理'
    })
], UserController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUEyRTtBQUMzRSw2Q0FPdUI7QUFDdkIsaURBQTRDO0FBQzVDLDhFQUFnRTtBQUVoRSw0REFBMkU7QUFNcEUsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQVFuQixBQUFOLEtBQUssQ0FBQyxLQUFLLENBQVMsSUFBa0I7UUFDcEMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsVUFBVSxDQUFTLElBQW1CO1FBQzFDLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoRCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsV0FBVyxDQUFVLEtBQXNCO1FBQy9DLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDakQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN2RCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsV0FBVyxDQUFVLEtBQWtCO1FBQzNDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUM7WUFDL0IsR0FBRyxLQUFLO1lBQ1IsS0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQztZQUM3QixRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUM7U0FDdkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUlLLEFBQU4sS0FBSyxDQUFDLFVBQVUsQ0FBUyxJQUFhO1FBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBWSxDQUFBO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsZUFBZSxDQUFTLElBQWdCO1FBQzVDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBWSxDQUFBO1FBQ3BELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFJSyxBQUFOLEtBQUssQ0FBQyx1QkFBdUIsQ0FBUyxJQUFtQjtRQUN2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVksQ0FBQTtRQUNwRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0lBSUssQUFBTixLQUFLLENBQUMsZ0JBQWdCLENBQVMsSUFBc0I7UUFDbkQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFZLENBQUE7UUFDcEQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUlLLEFBQU4sS0FBSyxDQUFDLGtCQUFrQixDQUNkLElBQTJCO1FBRW5DLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBWSxDQUFBO1FBQ3hELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ3hFLENBQUM7Q0FDRixDQUFBO0FBcEVZLHdDQUFjO0FBRXpCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0ksMEJBQVc7bURBQUE7QUFHeEI7SUFEQyxJQUFBLGFBQU0sR0FBRTs7MkNBQ0c7QUFHTjtJQURMLElBQUEsV0FBSSxFQUFDLFFBQVEsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNyQixXQUFBLElBQUEsV0FBSSxHQUFFLENBQUE7O3FDQUFPLHVCQUFZOzsyQ0FFckM7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDO0lBQzdCLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7cUNBQU8sd0JBQWE7O2dEQUUzQztBQUdLO0lBREwsSUFBQSxVQUFHLEVBQUMsY0FBYyxFQUFFLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxZQUFLLEdBQUUsQ0FBQTs7OztpREFHekI7QUFHSztJQURMLElBQUEsVUFBRyxFQUFDLGNBQWMsRUFBRSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUN6QixXQUFBLElBQUEsWUFBSyxHQUFFLENBQUE7O3FDQUFRLHNCQUFXOztpREFNNUM7QUFJSztJQUZMLElBQUEsV0FBSSxFQUFDLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ25ELElBQUEsNkJBQVEsR0FBRTtJQUNPLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7cUNBQU8sa0JBQU87O2dEQUdyQztBQUlLO0lBRkwsSUFBQSxXQUFJLEVBQUMsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFDOUMsSUFBQSw2QkFBUSxHQUFFO0lBQ1ksV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOztxQ0FBTyxzQkFBVTs7cURBRzdDO0FBSUs7SUFGTCxJQUFBLFdBQUksRUFBQywwQkFBMEIsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQztJQUNyRCxJQUFBLDZCQUFRLEdBQUU7SUFDb0IsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOztxQ0FBTyx3QkFBYTs7NkRBR3hEO0FBSUs7SUFGTCxJQUFBLFdBQUksRUFBQyx3QkFBd0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUN4RCxJQUFBLDZCQUFRLEdBQUU7SUFDYSxXQUFBLElBQUEsV0FBSSxHQUFFLENBQUE7O3FDQUFPLDRCQUFnQjs7c0RBR3BEO0FBSUs7SUFGTCxJQUFBLFdBQUksRUFBQyxxQkFBcUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsQ0FBQztJQUN6RCxJQUFBLDZCQUFRLEdBQUU7SUFFUixXQUFBLElBQUEsV0FBSSxHQUFFLENBQUE7O3FDQUFPLGdDQUFxQjs7d0RBSXBDO3lCQW5FVSxjQUFjO0lBSjFCLElBQUEsaUJBQVUsRUFBQyxhQUFhLEVBQUU7UUFDekIsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsV0FBVztLQUN6QixDQUFDO0dBQ1csY0FBYyxDQW9FMUIifQ==