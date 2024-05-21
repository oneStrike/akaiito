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
exports.LogController = void 0;
const core_1 = require("@midwayjs/core");
const log_service_1 = require("./log.service");
const log_dto_1 = require("./dto/log.dto");
let LogController = class LogController {
    async getRequestLogs(query) {
        return await this.logServer.getRequestLogs(query);
    }
};
exports.LogController = LogController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", log_service_1.LogService)
], LogController.prototype, "logServer", void 0);
__decorate([
    (0, core_1.Get)('/getRequestLogs', { summary: '获取请求日志' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [log_dto_1.LogDto]),
    __metadata("design:returntype", Promise)
], LogController.prototype, "getRequestLogs", null);
exports.LogController = LogController = __decorate([
    (0, core_1.Controller)('/admin/logs')
], LogController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJsb2cuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBK0Q7QUFDL0QsK0NBQTBDO0FBQzFDLDJDQUFzQztBQUcvQixJQUFNLGFBQWEsR0FBbkIsTUFBTSxhQUFhO0lBS2xCLEFBQU4sS0FBSyxDQUFDLGNBQWMsQ0FBVSxLQUFhO1FBQ3pDLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNuRCxDQUFDO0NBQ0YsQ0FBQTtBQVJZLHNDQUFhO0FBRXhCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0Usd0JBQVU7Z0RBQUE7QUFHZjtJQURMLElBQUEsVUFBRyxFQUFDLGlCQUFpQixFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDO0lBQ3hCLFdBQUEsSUFBQSxZQUFLLEdBQUUsQ0FBQTs7cUNBQVEsZ0JBQU07O21EQUUxQzt3QkFQVSxhQUFhO0lBRHpCLElBQUEsaUJBQVUsRUFBQyxhQUFhLENBQUM7R0FDYixhQUFhLENBUXpCIn0=