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
exports.BasicService = void 0;
const core_1 = require("@midwayjs/core");
const utils_1 = require("../../utils");
class BasicService {
    //手动抛出异常
    throwError(message) {
        throw new core_1.httpError.BadRequestError(message);
    }
    async getCount(where) {
        return await this.model.count(where || {});
    }
    //是否存在
    async exists(options) {
        const result = await this.model.findFirst({
            where: this.handlerWhere(options).where
        });
        return !!result;
    }
    // 创建数据
    async create(data) {
        const { id } = await this.model.create({ data });
        return id;
    }
    //更新数据
    async update(options, data) {
        try {
            return await this.model.update({
                where: this.handlerWhere(options).where,
                data
            });
        }
        catch (e) {
            return null;
        }
    }
    //批量更新数据
    async updateBatch(options, data) {
        try {
            return await this.model.updateMany({
                where: this.handlerWhere(options).where,
                data
            });
        }
        catch (e) {
            return null;
        }
    }
    //更新排序
    async updateOrder(info) {
        await Promise.all([
            this.update({ where: { id: info.targetId } }, { order: info.targetOrder }),
            this.update({ where: { id: info.originId } }, { order: info.originOrder })
        ]);
        return info.targetId;
    }
    // 软删除
    async softDeletion(options) {
        return await this.update({ where: this.handlerWhere(options).where }, { deletedAt: new Date() });
    }
    //删除
    async delete(options) {
        return await this.model.delete({
            where: this.handlerWhere(options).where
        });
    }
    //批量删除
    async deleteBatch(options) {
        return await this.model.deleteMany({
            where: this.handlerWhere(options).where
        });
    }
    // 根据条件查询唯一数据
    async findUnique(options) {
        const { where } = this.handlerWhere(options);
        return this.handlerExcludeField(this.excludeField(options.excludes), await this.model.findUnique({ where }));
    }
    // 分页查询
    async findPage(options) {
        var _a;
        const excludes = this.excludeField(options.excludes);
        const where = this.handlerWhere(options, true);
        // 并行查询总数和数据
        const [total, record] = await Promise.all([
            this.getCount({ where: where.where }),
            this.model.findMany(where)
        ]);
        return {
            pageSize: (_a = record === null || record === void 0 ? void 0 : record.length) !== null && _a !== void 0 ? _a : 0,
            pageIndex: where.skip ? where.skip / where.take + 1 : 1,
            total,
            list: this.handlerExcludeField(excludes, record)
        };
    }
    // 查询列表
    async findList(options) {
        const excludes = this.excludeField(options.excludes);
        const result = await this.model.findMany({
            ...this.handlerWhere(options),
            take: this.prismaConfig.maxListItemLimit
        });
        return {
            data: this.handlerExcludeField(excludes, result),
            total: result.length
        };
    }
    //排除结果中的指定字段
    handlerExcludeField(excludes, data) {
        if (!excludes || !excludes.length)
            return data;
        if (Array.isArray(data)) {
            return data.map((item) => utils_1.utils._.omit(item, excludes));
        }
        else {
            return utils_1.utils._.omit(data, excludes);
        }
    }
    //处理where
    handlerWhere(options, page) {
        const optionsKeys = [
            'orderBy',
            'pageSize',
            'pageIndex',
            'fuzzy',
            'where',
            'excludes',
            'startTime',
            'endTime'
        ];
        const where = {
            where: utils_1.utils._.omit(options, optionsKeys) || {}
        };
        if (options.where) {
            where.where = Object.assign(where.where, options.where);
        }
        where.orderBy = this.orderBy(options.orderBy);
        if (options === null || options === void 0 ? void 0 : options.fuzzy) {
            where.where = this.fuzzyQuery(options.fuzzy, Object.assign(where.where, options.where));
        }
        if (!where.where)
            where.where = {};
        if (options.startTime) {
            where.where.createdAt = {
                gte: options.startTime
            };
        }
        if (options.endTime) {
            if (!where.where.createdAt)
                where.where.createdAt = {};
            where.where.createdAt.lte = options.endTime;
        }
        if (page) {
            const { pageIndex, pageSize } = this.pagination(options);
            where.skip = pageIndex * pageSize;
            where.take = pageSize;
        }
        return where;
    }
    //分页
    pagination(options) {
        const { pageSize, pageIndex } = options;
        return {
            pageSize: pageSize || this.prismaConfig.pagination.pageSize,
            pageIndex: pageIndex || this.prismaConfig.pagination.pageIndex
        };
    }
    //排序
    orderBy(orderBy) {
        const orderByArr = [];
        if (utils_1.utils.isJson(orderBy)) {
            orderByArr.push(JSON.parse(orderBy));
        }
        if (this.prismaConfig.orderBy) {
            orderByArr.push(this.prismaConfig.orderBy);
        }
        return orderByArr;
    }
    /**
     * 模糊查询函数
     *
     * @param options - 查询选项的模糊匹配部分
     * @param where - 查询条件
     * @returns 返回模糊查询条件
     */
    fuzzyQuery(options, where) {
        if (!Array.isArray(options))
            return where;
        options.forEach((item) => {
            if (typeof item === 'string') {
                if (where[item]) {
                    where[item] = {
                        startsWith: `%${where[item]}%`
                    };
                }
            }
            else {
                where[item.field] = {
                    startsWith: item.pos.replace('V', where[item.field])
                };
            }
        });
        return where;
    }
    //排除的字段
    excludeField(field = []) {
        return field.concat(this.prismaConfig.excludes || []);
    }
}
exports.BasicService = BasicService;
__decorate([
    (0, core_1.App)(),
    __metadata("design:type", Object)
], BasicService.prototype, "app", void 0);
__decorate([
    (0, core_1.Config)('prisma'),
    __metadata("design:type", Object)
], BasicService.prototype, "prismaConfig", void 0);
__decorate([
    (0, core_1.Inject)(),
    __metadata("design:type", Object)
], BasicService.prototype, "ctx", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzaWMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2ljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXdFO0FBUXhFLHVDQUFtQztBQUduQyxNQUFzQixZQUFZO0lBZ0JoQyxRQUFRO0lBQ1IsVUFBVSxDQUFDLE9BQWU7UUFDeEIsTUFBTSxJQUFJLGdCQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQTRCO1FBQ3pDLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVELE1BQU07SUFDTixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQTZCO1FBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSztTQUN4QyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDakIsQ0FBQztJQUVELE9BQU87SUFDUCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQWdCO1FBQzNCLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNoRCxPQUFPLEVBQUUsQ0FBQTtJQUNYLENBQUM7SUFFRCxNQUFNO0lBQ04sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUE2QixFQUFFLElBQW1CO1FBQzdELElBQUksQ0FBQztZQUNILE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztnQkFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSztnQkFDdkMsSUFBSTthQUNMLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1gsT0FBTyxJQUFJLENBQUE7UUFDYixDQUFDO0lBQ0gsQ0FBQztJQUVELFFBQVE7SUFDUixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQTZCLEVBQUUsSUFBbUI7UUFDbEUsSUFBSSxDQUFDO1lBQ0gsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO2dCQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO2dCQUN2QyxJQUFJO2FBQ0wsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxPQUFPLElBQUksQ0FBQTtRQUNiLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTTtJQUNOLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBbUI7UUFDbkMsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQ1QsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQ2hDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDNUI7WUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUMzRSxDQUFDLENBQUE7UUFDRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUE7SUFDdEIsQ0FBQztJQUVELE1BQU07SUFDTixLQUFLLENBQUMsWUFBWSxDQUFDLE9BQThCO1FBQy9DLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUN0QixFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUMzQyxFQUFFLFNBQVMsRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLENBQzFCLENBQUE7SUFDSCxDQUFDO0lBRUQsSUFBSTtJQUNKLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBOEI7UUFDekMsT0FBTyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUs7U0FDeEMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELE1BQU07SUFDTixLQUFLLENBQUMsV0FBVyxDQUFDLE9BQThCO1FBQzlDLE9BQU8sTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLO1NBQ3hDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxhQUFhO0lBQ2IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUE4QjtRQUM3QyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM1QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQ25DLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUN2QyxDQUFBO0lBQ0gsQ0FBQztJQUVELE9BQU87SUFDUCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQThCOztRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUM5QyxZQUFZO1FBQ1osTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1NBQzNCLENBQUMsQ0FBQTtRQUNGLE9BQU87WUFDTCxRQUFRLEVBQUUsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsTUFBTSxtQ0FBSSxDQUFDO1lBQzdCLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELEtBQUs7WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7U0FDakQsQ0FBQTtJQUNILENBQUM7SUFFRCxPQUFPO0lBQ1AsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUE4QjtRQUMzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3ZDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUM7WUFDN0IsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsZ0JBQWdCO1NBQ3pDLENBQUMsQ0FBQTtRQUVGLE9BQU87WUFDTCxJQUFJLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7WUFDaEQsS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ3JCLENBQUE7SUFDSCxDQUFDO0lBRUQsWUFBWTtJQUNaLG1CQUFtQixDQUFJLFFBQWtCLEVBQUUsSUFBTztRQUNoRCxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU07WUFBRSxPQUFPLElBQUksQ0FBQTtRQUM5QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN4QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLGFBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBTSxDQUFBO1FBQzlELENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxhQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFjLEVBQUUsUUFBUSxDQUFNLENBQUE7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFRCxTQUFTO0lBQ1QsWUFBWSxDQUFDLE9BQTZCLEVBQUUsSUFBYztRQUN4RCxNQUFNLFdBQVcsR0FBRztZQUNsQixTQUFTO1lBQ1QsVUFBVTtZQUNWLFdBQVc7WUFDWCxPQUFPO1lBQ1AsT0FBTztZQUNQLFVBQVU7WUFDVixXQUFXO1lBQ1gsU0FBUztTQUNWLENBQUE7UUFFRCxNQUFNLEtBQUssR0FBa0I7WUFDM0IsS0FBSyxFQUFFLGFBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFO1NBQ2hELENBQUE7UUFFRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDekQsQ0FBQztRQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7UUFFN0MsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsS0FBSyxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUMzQixPQUFPLENBQUMsS0FBSyxFQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQzFDLENBQUE7UUFDSCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQUUsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFDbEMsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDdEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUc7Z0JBQ3RCLEdBQUcsRUFBRSxPQUFPLENBQUMsU0FBUzthQUN2QixDQUFBO1FBQ0gsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVM7Z0JBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1lBQ3RELEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFBO1FBQzdDLENBQUM7UUFFRCxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ1QsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ3hELEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQTtZQUNqQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQTtRQUN2QixDQUFDO1FBQ0QsT0FBTyxLQUFLLENBQUE7SUFDZCxDQUFDO0lBRUQsSUFBSTtJQUNKLFVBQVUsQ0FBQyxPQUFzQjtRQUMvQixNQUFNLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQTtRQUN2QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRO1lBQzNELFNBQVMsRUFBRSxTQUFTLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsU0FBUztTQUMvRCxDQUFBO0lBQ0gsQ0FBQztJQUVELElBQUk7SUFDSixPQUFPLENBQUMsT0FBZ0I7UUFDdEIsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLElBQUksYUFBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQzFCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1FBQ3RDLENBQUM7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLENBQUM7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsVUFBVSxDQUNSLE9BQXNDLEVBQ3RDLEtBQW9DO1FBRXBDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFBO1FBQ3pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUEyQyxFQUFFLEVBQUU7WUFDOUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDN0IsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztvQkFDaEIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNaLFVBQVUsRUFBRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRztxQkFDL0IsQ0FBQTtnQkFDSCxDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7b0JBQ2xCLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDckQsQ0FBQTtZQUNILENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sS0FBSyxDQUFBO0lBQ2QsQ0FBQztJQUVELE9BQU87SUFDUCxZQUFZLENBQUMsUUFBa0IsRUFBRTtRQUMvQixPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUE7SUFDdkQsQ0FBQztDQUNGO0FBeFBELG9DQXdQQztBQXJQVztJQURULElBQUEsVUFBRyxHQUFFOzt5Q0FDb0I7QUFJMUI7SUFEQyxJQUFBLGFBQU0sRUFBQyxRQUFRLENBQUM7O2tEQUNTO0FBSWhCO0lBRFQsSUFBQSxhQUFNLEdBQUU7O3lDQUNhIn0=