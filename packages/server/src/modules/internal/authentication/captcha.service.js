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
exports.CaptchaService = void 0;
const core_1 = require("@midwayjs/core");
const captcha_1 = require("@midwayjs/captcha");
let CaptchaService = class CaptchaService {
    async getCaptcha() {
        const { id, imageBase64: data } = await this.captchaService.image({
            size: 4,
            noise: 3,
            type: 'letter'
        });
        return {
            id,
            data
        };
    }
    async verifyCaptcha(captchaId, captcha) {
        return await this.captchaService.check(captchaId, captcha);
    }
};
exports.CaptchaService = CaptchaService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", captcha_1.CaptchaService)
], CaptchaService.prototype, "captchaService", void 0);
exports.CaptchaService = CaptchaService = __decorate([
    (0, core_1.Provide)()
], CaptchaService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FwdGNoYS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FwdGNoYS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRDtBQUNoRCwrQ0FBNkQ7QUFHdEQsSUFBTSxjQUFjLEdBQXBCLE1BQU0sY0FBYztJQUl6QixLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7WUFDaEUsSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsQ0FBQztZQUNSLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQyxDQUFBO1FBQ0YsT0FBTztZQUNMLEVBQUU7WUFDRixJQUFJO1NBQ0wsQ0FBQTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQWlCLEVBQUUsT0FBZTtRQUNwRCxPQUFPLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzVELENBQUM7Q0FDRixDQUFBO0FBbkJZLHdDQUFjO0FBRXpCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ08sd0JBQU87c0RBQUE7eUJBRlosY0FBYztJQUQxQixJQUFBLGNBQU8sR0FBRTtHQUNHLGNBQWMsQ0FtQjFCIn0=