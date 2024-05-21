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
exports.DictionaryService = void 0;
const core_1 = require("@midwayjs/core");
const basic_service_1 = require("@/basic/service/basic.service");
const client_1 = require("@prisma/client");
let DictionaryService = class DictionaryService extends basic_service_1.BasicService {
    get model() {
        return this.prismaClient.dataDictionary;
    }
};
exports.DictionaryService = DictionaryService;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.PrismaClient)
], DictionaryService.prototype, "prismaClient", void 0);
exports.DictionaryService = DictionaryService = __decorate([
    (0, core_1.Provide)()
], DictionaryService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGljdGlvbmFyeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRDtBQUNoRCxpRUFBNEQ7QUFDNUQsMkNBQTZEO0FBR3RELElBQU0saUJBQWlCLEdBQXZCLE1BQU0saUJBQWtCLFNBQVEsNEJBQTRCO0lBSWpFLElBQWMsS0FBSztRQUNqQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFBO0lBQ3pDLENBQUM7Q0FDRixDQUFBO0FBUFksOENBQWlCO0FBRTVCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ0sscUJBQVk7dURBQUE7NEJBRmYsaUJBQWlCO0lBRDdCLElBQUEsY0FBTyxHQUFFO0dBQ0csaUJBQWlCLENBTzdCIn0=