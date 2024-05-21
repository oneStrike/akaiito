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
exports.FunPluginController = void 0;
const core_1 = require("@midwayjs/core");
const funPlugin_dto_1 = require("./dto/funPlugin.dto");
const funPlugin_service_1 = require("./funPlugin.service");
const basic_dto_1 = require("@/basic/dto/basic.dto");
let FunPluginController = class FunPluginController {
    async getFunPlugin(query) {
        return this.funPluginService.findPage({
            ...query,
            fuzzy: ['name']
        });
    }
    async createFunPlugin(body) {
        return this.funPluginService.create(body);
    }
    async updateFunPlugin(body) {
        return this.funPluginService.update({ id: body.id }, body);
    }
    async deleteFunPlugin(body) {
        return this.funPluginService.delete(body);
    }
    async updateFunPluginStatus(body) {
        return this.funPluginService.delete(body);
    }
};
exports.FunPluginController = FunPluginController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", funPlugin_service_1.FunPluginService)
], FunPluginController.prototype, "funPluginService", void 0);
__decorate([
    (0, core_1.Get)('/getFunPlugin', { summary: '获取功能插件列表' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funPlugin_dto_1.CreateFunPluginDto]),
    __metadata("design:returntype", Promise)
], FunPluginController.prototype, "getFunPlugin", null);
__decorate([
    (0, core_1.Post)('/createFunPlugin', { summary: '创建功能插件' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funPlugin_dto_1.CreateFunPluginDto]),
    __metadata("design:returntype", Promise)
], FunPluginController.prototype, "createFunPlugin", null);
__decorate([
    (0, core_1.Post)('/updateFunPlugin', { summary: '更新功能插件' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [funPlugin_dto_1.FunPluginDto]),
    __metadata("design:returntype", Promise)
], FunPluginController.prototype, "updateFunPlugin", null);
__decorate([
    (0, core_1.Post)('/deleteFunPlugin', { summary: '删除功能插件' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdDto]),
    __metadata("design:returntype", Promise)
], FunPluginController.prototype, "deleteFunPlugin", null);
__decorate([
    (0, core_1.Post)('/updateFunPluginStatus', { summary: '更新功能插件状态' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdStatusDto]),
    __metadata("design:returntype", Promise)
], FunPluginController.prototype, "updateFunPluginStatus", null);
exports.FunPluginController = FunPluginController = __decorate([
    (0, core_1.Controller)('/admin/funPlugin')
], FunPluginController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuUGx1Z2luLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5QbHVnaW4uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBMkU7QUFDM0UsdURBQXNFO0FBQ3RFLDJEQUFzRDtBQUN0RCxxREFBb0U7QUFHN0QsSUFBTSxtQkFBbUIsR0FBekIsTUFBTSxtQkFBbUI7SUFLeEIsQUFBTixLQUFLLENBQUMsWUFBWSxDQUFVLEtBQXlCO1FBQ25ELE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQztZQUNwQyxHQUFHLEtBQUs7WUFDUixLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDaEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGVBQWUsQ0FBUyxJQUF3QjtRQUNwRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0MsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLGVBQWUsQ0FBUyxJQUFrQjtRQUM5QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzVELENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxlQUFlLENBQVMsSUFBZ0I7UUFDNUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxxQkFBcUIsQ0FBUyxJQUFzQjtRQUN4RCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDM0MsQ0FBQztDQUNGLENBQUE7QUEvQlksa0RBQW1CO0FBRTlCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1Msb0NBQWdCOzZEQUFBO0FBRzVCO0lBREwsSUFBQSxVQUFHLEVBQUMsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzFCLFdBQUEsSUFBQSxZQUFLLEdBQUUsQ0FBQTs7cUNBQVEsa0NBQWtCOzt1REFLcEQ7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7cUNBQU8sa0NBQWtCOzswREFFckQ7QUFHSztJQURMLElBQUEsV0FBSSxFQUFDLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFdBQUEsSUFBQSxXQUFJLEdBQUUsQ0FBQTs7cUNBQU8sNEJBQVk7OzBEQUUvQztBQUdLO0lBREwsSUFBQSxXQUFJLEVBQUMsa0JBQWtCLEVBQUUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUM7SUFDekIsV0FBQSxJQUFBLFdBQUksR0FBRSxDQUFBOztxQ0FBTyxzQkFBVTs7MERBRTdDO0FBR0s7SUFETCxJQUFBLFdBQUksRUFBQyx3QkFBd0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQztJQUMzQixXQUFBLElBQUEsV0FBSSxHQUFFLENBQUE7O3FDQUFPLDRCQUFnQjs7Z0VBRXpEOzhCQTlCVSxtQkFBbUI7SUFEL0IsSUFBQSxpQkFBVSxFQUFDLGtCQUFrQixDQUFDO0dBQ2xCLG1CQUFtQixDQStCL0IifQ==