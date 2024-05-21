"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.find = void 0;
const formatDate_1 = require("../utils/formatDate");
/**
 * 根据给定的选项查找数据。
 * @param context - 上下文对象。
 * @param options - 选项对象。
 * @param timeSerialize - 是否序列化时间的布尔值。
 * @returns 返回一个解析为结果的 Promise。
 */
const find = async (context, options, timeSerialize) => {
    // 删除在上下文字段中不存在的 orderBy 键
    if (options.orderBy) {
        const fields = Object.keys(context.fields);
        for (const orderByKey in options.orderBy) {
            if (!fields.includes(orderByKey)) {
                delete options.orderBy[orderByKey];
            }
        }
    }
    // 删除 options 中的 exclude 键
    const exclude = options.exclude || [];
    delete options.exclude;
    if (!options.orderBy)
        delete options.orderBy;
    // 根据选项查找数据
    const result = await context.findMany(options);
    // 如果 timeSerialize 为 true，则序列化时间
    if (timeSerialize) {
        for (const item of result) {
            for (const itemKey in item) {
                if (exclude.includes(itemKey)) {
                    delete item[itemKey];
                }
                if (item[itemKey] instanceof Date) {
                    item[itemKey] = (0, formatDate_1.formatDate)(item[itemKey]);
                }
            }
        }
    }
    return result;
};
exports.find = find;
const findOne = async (context, options, timeSerialize) => {
    const exclude = options.exclude || [];
    delete options.exclude;
    // 根据选项查找数据
    const result = await context.findUnique(options);
    if (timeSerialize || exclude.length) {
        for (const resultKey in result) {
            const item = result[resultKey];
            if (exclude.includes(resultKey)) {
                delete result[resultKey];
            }
            if (item instanceof Date && timeSerialize) {
                result[resultKey] = (0, formatDate_1.formatDate)(item);
            }
        }
    }
    return result;
};
exports.findOne = findOne;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBQWdEO0FBRWhEOzs7Ozs7R0FNRztBQUNJLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFDdkIsT0FBWSxFQUNaLE9BQVksRUFDWixhQUFzQixFQUNWLEVBQUU7SUFDZCwwQkFBMEI7SUFDMUIsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUMsS0FBSyxNQUFNLFVBQVUsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDakMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELDBCQUEwQjtJQUMxQixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQTtJQUNyQyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUE7SUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPO1FBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFBO0lBQzVDLFdBQVc7SUFDWCxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDOUMsaUNBQWlDO0lBQ2pDLElBQUksYUFBYSxFQUFFLENBQUM7UUFDbEIsS0FBSyxNQUFNLElBQUksSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMxQixLQUFLLE1BQU0sT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUMzQixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztvQkFDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ3RCLENBQUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7b0JBQ2xDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLHVCQUFVLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7Z0JBQzNDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQW5DWSxRQUFBLElBQUksUUFtQ2hCO0FBRU0sTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUMxQixPQUFZLEVBQ1osT0FBWSxFQUNaLGFBQXNCLEVBQ1YsRUFBRTtJQUNkLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO0lBQ3JDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQTtJQUN0QixXQUFXO0lBQ1gsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2hELElBQUksYUFBYSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQyxLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUM5QixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztnQkFDaEMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7WUFDMUIsQ0FBQztZQUNELElBQUksSUFBSSxZQUFZLElBQUksSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUEsdUJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQTtZQUN0QyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQXRCWSxRQUFBLE9BQU8sV0FzQm5CIn0=