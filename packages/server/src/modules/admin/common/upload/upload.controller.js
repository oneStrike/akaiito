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
exports.HomeController = void 0;
const core_1 = require("@midwayjs/core");
const upload_service_1 = require("./upload.service");
let HomeController = class HomeController {
    async upload(files, fields) {
        return this.uploadService.local(files, fields);
    }
};
exports.HomeController = HomeController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", upload_service_1.UploadService)
], HomeController.prototype, "uploadService", void 0);
__decorate([
    (0, core_1.Post)('/uploadFile'),
    __param(0, (0, core_1.Files)()),
    __param(1, (0, core_1.Fields)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], HomeController.prototype, "upload", null);
exports.HomeController = HomeController = __decorate([
    (0, core_1.Controller)('/common/upload')
], HomeController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0U7QUFDeEUscURBQWdEO0FBR3pDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFLbkIsQUFBTixLQUFLLENBQUMsTUFBTSxDQUFVLEtBQUssRUFBWSxNQUFNO1FBQzNDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ2hELENBQUM7Q0FDRixDQUFBO0FBUlksd0NBQWM7QUFFekI7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSw4QkFBYTtxREFBQTtBQUd0QjtJQURMLElBQUEsV0FBSSxFQUFDLGFBQWEsQ0FBQztJQUNOLFdBQUEsSUFBQSxZQUFLLEdBQUUsQ0FBQTtJQUFTLFdBQUEsSUFBQSxhQUFNLEdBQUUsQ0FBQTs7Ozs0Q0FFckM7eUJBUFUsY0FBYztJQUQxQixJQUFBLGlCQUFVLEVBQUMsZ0JBQWdCLENBQUM7R0FDaEIsY0FBYyxDQVExQiJ9