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
exports.SystemController = void 0;
const core_1 = require("@midwayjs/core");
const system_service_1 = require("./system.service");
let SystemController = class SystemController {
};
exports.SystemController = SystemController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", system_service_1.SystemService)
], SystemController.prototype, "systemService", void 0);
exports.SystemController = SystemController = __decorate([
    (0, core_1.Controller)('/admin/system')
], SystemController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzeXN0ZW0uY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx5Q0FBbUQ7QUFDbkQscURBQWdEO0FBR3pDLElBQU0sZ0JBQWdCLEdBQXRCLE1BQU0sZ0JBQWdCO0NBRzVCLENBQUE7QUFIWSw0Q0FBZ0I7QUFFM0I7SUFEQyxJQUFBLGFBQU0sR0FBRTs4QkFDTSw4QkFBYTt1REFBQTsyQkFGakIsZ0JBQWdCO0lBRDVCLElBQUEsaUJBQVUsRUFBQyxlQUFlLENBQUM7R0FDZixnQkFBZ0IsQ0FHNUIifQ==