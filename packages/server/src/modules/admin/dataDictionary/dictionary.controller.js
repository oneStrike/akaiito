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
exports.DictionaryController = void 0;
const core_1 = require("@midwayjs/core");
const dictionary_service_1 = require("./dictionary.service");
const dictionary_dto_1 = require("./dto/dictionary.dto");
const dictionary_items_service_1 = require("./dictionary-items.service");
const basic_dto_1 = require("@/basic/dto/basic.dto");
let DictionaryController = class DictionaryController {
    async getDataDictionary(query) {
        return this.dictionaryService.findPage({
            ...query,
            fuzzy: ['name', 'code']
        });
    }
    async getDataDictionaryItems(query) {
        return this.dictionaryItemsService.getItems({
            ...query,
            fuzzy: ['name', 'code']
        });
    }
    async createDataDictionary(body) {
        return this.dictionaryService.create(body);
    }
    async createDataDictionaryItems(body) {
        return this.dictionaryItemsService.createItems(body);
    }
    async deleteDataDictionary(body) {
        return this.dictionaryService.deleteBatch({ id: { in: body.ids } });
    }
    async deleteDataDictionaryItems(body) {
        return this.dictionaryItemsService.deleteBatch({ id: { in: body.ids } });
    }
    async updateDataDictionary(body) {
        return this.dictionaryService.update({ id: body.id }, body);
    }
    async updateDataDictionaryItems(body) {
        return this.dictionaryItemsService.update({ id: body.id }, body);
    }
    async updateDataDictionaryStatus(body) {
        return this.dictionaryService.updateBatch({ id: { in: body.ids } }, { status: body.status });
    }
    async updateDataDictionaryItemsStatus(body) {
        return this.dictionaryItemsService.updateBatch({ id: { in: body.ids } }, { status: body.status });
    }
    async updateDataDictionaryItemsOrder(body) {
        return this.dictionaryItemsService.updateOrder(body);
    }
};
exports.DictionaryController = DictionaryController;
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", dictionary_service_1.DictionaryService)
], DictionaryController.prototype, "dictionaryService", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", dictionary_items_service_1.DictionaryServiceItems)
], DictionaryController.prototype, "dictionaryItemsService", void 0);
__decorate([
    (0, core_1.Get)('/getDataDictionary', { summary: '获取数据字典列表' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.FindDictionDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "getDataDictionary", null);
__decorate([
    (0, core_1.Get)('/getDataDictionaryItems', { summary: '获取数据字典子项列表' }),
    __param(0, (0, core_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.FindDictionItemsDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "getDataDictionaryItems", null);
__decorate([
    (0, core_1.Post)('/createDataDictionary', { summary: '创建数据字典' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.CreateDictionaryDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "createDataDictionary", null);
__decorate([
    (0, core_1.Post)('/createDataDictionaryItems', { summary: '创建数据字典子项' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.CreateDictionaryItemsDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "createDataDictionaryItems", null);
__decorate([
    (0, core_1.Post)('/deleteDataDictionary', { summary: '删除数据字典' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdsDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "deleteDataDictionary", null);
__decorate([
    (0, core_1.Post)('/deleteDataDictionaryItems', { summary: '删除数据字典子项' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdsDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "deleteDataDictionaryItems", null);
__decorate([
    (0, core_1.Post)('/updateDataDictionary', { summary: '更新数据字典' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.UpdateDictionaryDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDataDictionary", null);
__decorate([
    (0, core_1.Post)('/updateDataDictionaryItems', { summary: '更新数据字典子项' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dictionary_dto_1.UpdateDictionaryDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDataDictionaryItems", null);
__decorate([
    (0, core_1.Post)('/updateDataDictionaryStatus', { summary: '更新数据字典状态' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdsStatusDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDataDictionaryStatus", null);
__decorate([
    (0, core_1.Post)('/updateDataDictionaryItemsStatus', { summary: '更新数据字典子项状态' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicIdsStatusDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDataDictionaryItemsStatus", null);
__decorate([
    (0, core_1.Post)('/updateDataDictionaryItemsOrder', { summary: '更新数据字典子项排序' }),
    __param(0, (0, core_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [basic_dto_1.BasicOrderDto]),
    __metadata("design:returntype", Promise)
], DictionaryController.prototype, "updateDataDictionaryItemsOrder", null);
exports.DictionaryController = DictionaryController = __decorate([
    (0, core_1.Controller)('/admin/dictionary')
], DictionaryController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGljdGlvbmFyeS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGljdGlvbmFyeS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHlDQUEyRTtBQUMzRSw2REFBd0Q7QUFDeEQseURBTTZCO0FBQzdCLHlFQUFtRTtBQUNuRSxxREFJOEI7QUFHdkIsSUFBTSxvQkFBb0IsR0FBMUIsTUFBTSxvQkFBb0I7SUFRekIsQUFBTixLQUFLLENBQUMsaUJBQWlCLENBQVUsS0FBcUI7UUFDcEQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEdBQUcsS0FBSztZQUNSLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7U0FDeEIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLHNCQUFzQixDQUFVLEtBQTBCO1FBQzlELE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQztZQUMxQyxHQUFHLEtBQUs7WUFDUixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO1NBQ3hCLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFHSyxBQUFOLEtBQUssQ0FBQyxvQkFBb0IsQ0FBUyxJQUF5QjtRQUMxRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUdLLEFBQU4sS0FBSyxDQUFDLHlCQUF5QixDQUFTLElBQThCO1FBQ3BFLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBR0ssQUFBTixLQUFLLENBQUMsb0JBQW9CLENBQVMsSUFBaUI7UUFDbEQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FB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