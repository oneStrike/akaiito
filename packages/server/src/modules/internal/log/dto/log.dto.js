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
exports.LogDto = void 0;
const validate_1 = require("@midwayjs/validate");
const validate_2 = require("../../../../utils/validate");
const basic_dto_1 = require("../../../../basic/dto/basic.dto");
class LogDto extends basic_dto_1.BasicPageDto {
}
exports.LogDto = LogDto;
__decorate([
    (0, validate_1.Rule)((0, validate_2.givenValue)(['POST', 'GET'], false)),
    __metadata("design:type", String)
], LogDto.prototype, "method", void 0);
__decorate([
    (0, validate_1.Rule)((0, validate_2.validateNumberLess)(2)),
    __metadata("design:type", Number)
], LogDto.prototype, "status", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", Number)
], LogDto.prototype, "path", void 0);
__decorate([
    (0, validate_1.Rule)(validate_2.validateString),
    __metadata("design:type", String)
], LogDto.prototype, "mobile", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nLmR0by5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZy5kdG8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXlDO0FBQ3pDLHlEQUltQztBQUNuQywrREFBOEQ7QUFFOUQsTUFBYSxNQUFPLFNBQVEsd0JBQVk7Q0FZdkM7QUFaRCx3QkFZQztBQVZDO0lBREMsSUFBQSxlQUFJLEVBQUMsSUFBQSxxQkFBVSxFQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDOztzQ0FDbEI7QUFHdkI7SUFEQyxJQUFBLGVBQUksRUFBQyxJQUFBLDZCQUFrQixFQUFDLENBQUMsQ0FBQyxDQUFDOztzQ0FDYjtBQUdmO0lBREMsSUFBQSxlQUFJLEVBQUMseUJBQWMsQ0FBQzs7b0NBQ1I7QUFHYjtJQURDLElBQUEsZUFBSSxFQUFDLHlCQUFjLENBQUM7O3NDQUNOIn0=