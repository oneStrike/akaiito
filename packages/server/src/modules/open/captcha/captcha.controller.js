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
exports.CaptchaController = void 0;
const core_1 = require("@midwayjs/core");
const captcha_service_1 = require("../../internal/authentication/captcha.service");
let CaptchaController = class CaptchaController {
    async getCaptcha() {
        return await this.captchaServer.getCaptcha();
    }
};
exports.CaptchaController = CaptchaController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", captcha_service_1.CaptchaService)
], CaptchaController.prototype, "captchaServer", void 0);
__decorate([
    (0, core_1.Get)('/getCaptcha', { summary: '获取验证码' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CaptchaController.prototype, "getCaptcha", null);
exports.CaptchaController = CaptchaController = __decorate([
    (0, core_1.Controller)('/open/captcha')
], CaptchaController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FwdGNoYS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUF3RDtBQUN4RCxtRkFBOEU7QUFHdkUsSUFBTSxpQkFBaUIsR0FBdkIsTUFBTSxpQkFBaUI7SUFLdEIsQUFBTixLQUFLLENBQUMsVUFBVTtRQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQzlDLENBQUM7Q0FDRixDQUFBO0FBUlksOENBQWlCO0FBRTVCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ00sZ0NBQWM7d0RBQUE7QUFHdkI7SUFETCxJQUFBLFVBQUcsRUFBQyxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUM7Ozs7bURBR3hDOzRCQVBVLGlCQUFpQjtJQUQ3QixJQUFBLGlCQUFVLEVBQUMsZUFBZSxDQUFDO0dBQ2YsaUJBQWlCLENBUTdCIn0=