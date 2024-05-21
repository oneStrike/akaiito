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
exports.FunPluginService = void 0;
const core_1 = require("@midwayjs/core");
const basic_service_1 = require("@/basic/service/basic.service");
const client_1 = require("@prisma/client");
let FunPluginService = class FunPluginService extends basic_service_1.BasicService {
    get model() {
        return this.prismaClient.funPlugin;
    }
};
exports.FunPluginService = FunPluginService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.PrismaClient)
], FunPluginService.prototype, "prismaClient", void 0);
exports.FunPluginService = FunPluginService = __decorate([
    (0, core_1.Provide)()
], FunPluginService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuUGx1Z2luLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmdW5QbHVnaW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBZ0Q7QUFDaEQsaUVBQTREO0FBQzVELDJDQUF3RDtBQUdqRCxJQUFNLGdCQUFnQixHQUF0QixNQUFNLGdCQUFpQixTQUFRLDRCQUF1QjtJQUkzRCxJQUFjLEtBQUs7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQTtJQUNwQyxDQUFDO0NBQ0YsQ0FBQTtBQVBZLDRDQUFnQjtBQUUzQjtJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNLLHFCQUFZO3NEQUFBOzJCQUZmLGdCQUFnQjtJQUQ1QixJQUFBLGNBQU8sR0FBRTtHQUNHLGdCQUFnQixDQU81QiJ9