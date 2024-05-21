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
exports.UserService = void 0;
const core_1 = require("@midwayjs/core");
const client_1 = require("@prisma/client");
const basic_service_1 = require("../../../basic/service/basic.service");
const utils_1 = require("../../../utils");
const jwt_service_1 = require("../../internal/authentication/jwt.service");
const captcha_service_1 = require("../../internal/authentication/captcha.service");
let UserService = class UserService extends basic_service_1.BasicService {
    get model() {
        return this.prismaClient.adminUser;
    }
    //创建用户
    async createUser(info) {
        if (info.password !== info.confirmPassword) {
            this.throwError('密码不一致');
        }
        const isExists = await this.exists({
            where: { OR: [{ mobile: info.mobile }, { username: info.username }] }
        });
        this.model.findFirst({ where: {} });
        if (isExists) {
            this.throwError('用户信息已被注册');
        }
        delete info.confirmPassword;
        //加密密码
        info.password = await utils_1.utils.encryption(info.password);
        return this.create(info);
    }
    //登录
    async login(info) {
        if ((await this.captchaServer.verifyCaptcha(info.captchaId, info.captcha)) &&
            this.app.getEnv() === 'prod') {
            this.throwError('验证码错误');
        }
        const userInfo = await this.model.findUnique({
            where: { mobile: info.mobile }
        });
        if (!userInfo ||
            !(await this.diffPassword(info.password, userInfo.password))) {
            this.throwError('手机号或密码错误');
        }
        if (!userInfo.status) {
            this.throwError('账户已被禁用，请联系系统管理员');
        }
        delete userInfo.password;
        const token = {
            accessToken: await this.jwt.sign({
                id: userInfo.id,
                username: userInfo.username,
                mobile: userInfo.mobile
            }),
            refreshToken: await this.jwt.sign({ id: userInfo.id, refresh: true }, { expiresIn: 1000 * 60 * 60 * 24 * 2 })
        };
        return {
            token,
            userInfo
        };
    }
    //删除管理员用户
    async deleteAdminUser(delId, user) {
        if (!user.isRoot) {
            this.throwError('权限不足');
        }
        if (user.id === delId.id) {
            this.throwError('无法删除自己');
        }
        const { id } = await this.model.delete({ where: delId });
        return id;
    }
    //更新用户信息
    async updateUserInfo(userInfo, user, type) {
        if (userInfo.id !== user.id && user.isRoot !== 1) {
            this.throwError('权限不足');
        }
        if (userInfo.id === user.id && type !== 'info') {
            this.throwError('权限不足');
        }
        const result = await this.update({ where: { id: userInfo.id } }, userInfo);
        return (result === null || result === void 0 ? void 0 : result.id) || result;
    }
    //修改用户密码
    async updateUserPwd(userInfo, user) {
        if (userInfo.id !== user.id && user.isRoot !== 1) {
            this.throwError('权限不足');
        }
        if (userInfo.newPassword !== userInfo.confirmNewPassword) {
            this.throwError('密码输入不一致');
        }
        const oldUserInfo = await this.model.findUnique({
            where: { id: userInfo.id }
        });
        if (!oldUserInfo) {
            this.throwError('用户不存在');
        }
        if (!(await this.diffPassword(userInfo.oldPassword, oldUserInfo.password))) {
            this.throwError('原密码错误');
        }
        const result = await this.update({ where: { id: userInfo.id } }, {
            password: await utils_1.utils.encryption(userInfo.newPassword)
        });
        return (result === null || result === void 0 ? void 0 : result.id) || result;
    }
    async refreshAccessToken(token, userInfo) {
        const accessToken = await this.jwt.verify(token);
        if (typeof accessToken === 'string' || accessToken.id !== userInfo.id) {
            this.throwError('权限不足');
        }
        return await this.jwt.sign({ id: userInfo.id });
    }
    //比对密码
    async diffPassword(newPwd, oldPwd) {
        const salt = oldPwd.split('.')[0];
        const currentPassword = await utils_1.utils.encryption(newPwd, salt);
        return currentPassword === oldPwd;
    }
};
exports.UserService = UserService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.PrismaClient)
], UserService.prototype, "prismaClient", void 0);
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], UserService.prototype, "app", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", jwt_service_1.Jwt)
], UserService.prototype, "jwt", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", captcha_service_1.CaptchaService)
], UserService.prototype, "captchaServer", void 0);
exports.UserService = UserService = __decorate([
    (0, core_1.Provide)()
], UserService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFxRDtBQUNyRCwyQ0FBd0Q7QUFDeEQsd0VBQW1FO0FBQ25FLDBDQUFzQztBQVF0QywyRUFBK0Q7QUFDL0QsbUZBQThFO0FBR3ZFLElBQU0sV0FBVyxHQUFqQixNQUFNLFdBQVksU0FBUSw0QkFBdUI7SUFhdEQsSUFBYyxLQUFLO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUE7SUFDcEMsQ0FBQztJQUVELE1BQU07SUFDTixLQUFLLENBQUMsVUFBVSxDQUFDLElBQW1CO1FBQ2xDLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMxQixDQUFDO1FBQ0QsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2pDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRTtTQUN0RSxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLElBQUksUUFBUSxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUE7UUFDM0IsTUFBTTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxhQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FB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