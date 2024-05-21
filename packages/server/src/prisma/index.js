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
exports.RegisterPrisma = void 0;
const core_1 = require("@midwayjs/core");
const client_1 = require("@prisma/client");
let RegisterPrisma = class RegisterPrisma {
    register(container) {
        const prisma = new client_1.PrismaClient({
            log: [
                { level: 'query', emit: 'event' },
                { level: 'error', emit: 'event' }
            ]
        });
        container.registerObject('prismaClient', prisma);
    }
};
exports.RegisterPrisma = RegisterPrisma;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], RegisterPrisma.prototype, "logger", void 0);
exports.RegisterPrisma = RegisterPrisma = __decorate([
    (0, core_1.Provide)(),
    (0, core_1.Scope)(core_1.ScopeEnum.Request, { allowDowngrade: true })
], RegisterPrisma);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FPdUI7QUFDdkIsMkNBQTZDO0FBSXRDLElBQU0sY0FBYyxHQUFwQixNQUFNLGNBQWM7SUFJekIsUUFBUSxDQUFDLFNBQTJCO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksQ0FBQztZQUM5QixHQUFHLEVBQUU7Z0JBQ0gsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7Z0JBQ2pDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO2FBQ2xDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDbEQsQ0FBQztDQUNGLENBQUE7QUFkWSx3Q0FBYztBQUV6QjtJQURDLElBQUEsYUFBTSxHQUFFOzs4Q0FDTTt5QkFGSixjQUFjO0lBRjFCLElBQUEsY0FBTyxHQUFFO0lBQ1QsSUFBQSxZQUFLLEVBQUMsZ0JBQVMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7R0FDdEMsY0FBYyxDQWMxQiJ9