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
exports.DictionaryServiceItems = void 0;
const core_1 = require("@midwayjs/core");
const basic_service_1 = require("../../../basic/service/basic.service");
const client_1 = require("@prisma/client");
const dictionary_service_1 = require("./dictionary.service");
let DictionaryServiceItems = class DictionaryServiceItems extends basic_service_1.BasicService {
    get model() {
        return this.prismaClient.dataDictionaryItems;
    }
    async getItems(items) {
        return this.findPage({ ...items });
    }
    async createItems(items) {
        const dict = await this.dictionaryService.findUnique({
            id: items.dictionaryId
        });
        if (!dict) {
            return this.throwError('暂未查询到对应的数据字典');
        }
        return this.create({
            ...items,
            dictionaryName: dict.name,
            order: await this.getCount()
        });
    }
};
exports.DictionaryServiceItems = DictionaryServiceItems;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", client_1.PrismaClient)
], DictionaryServiceItems.prototype, "prismaClient", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", dictionary_service_1.DictionaryService)
], DictionaryServiceItems.prototype, "dictionaryService", void 0);
exports.DictionaryServiceItems = DictionaryServiceItems = __decorate([
    (0, core_1.Provide)()
], DictionaryServiceItems);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS1pdGVtcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGljdGlvbmFyeS1pdGVtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHlDQUFnRDtBQUNoRCx3RUFBbUU7QUFDbkUsMkNBQWtFO0FBR2xFLDZEQUF3RDtBQUdqRCxJQUFNLHNCQUFzQixHQUE1QixNQUFNLHNCQUF1QixTQUFRLDRCQUFpQztJQU8zRSxJQUFjLEtBQUs7UUFDakIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFBO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQTZDO1FBQzFELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUErQjtRQUMvQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUM7WUFDbkQsRUFBRSxFQUFFLEtBQUssQ0FBQyxZQUFZO1NBQ3ZCLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUN4QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQ2pCLEdBQUcsS0FBSztZQUNSLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSTtZQUN6QixLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzdCLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFBO0FBNUJZLHdEQUFzQjtBQUVqQztJQURDLElBQUEsYUFBTSxHQUFFOzhCQUNLLHFCQUFZOzREQUFBO0FBRzFCO0lBREMsSUFBQSxhQUFNLEdBQUU7OEJBQ1Usc0NBQWlCO2lFQUFBO2lDQUx6QixzQkFBc0I7SUFEbEMsSUFBQSxjQUFPLEdBQUU7R0FDRyxzQkFBc0IsQ0E0QmxDIn0=