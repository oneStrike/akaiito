"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletion = exports.findOne = exports.find = exports.isExists = void 0;
const exists_1 = require("./exists");
const prismaFind = require("./find");
const softDeletion_1 = require("./softDeletion");
const extension_1 = require("@prisma/client/extension");
// 异步函数，判断给定的 where 条件是否存在
const isExists = async function (where) {
    if (!where)
        return false;
    const context = extension_1.Prisma.getExtensionContext(this);
    return await (0, exists_1.exists)(context, where);
};
exports.isExists = isExists;
// 异步函数，根据给定的 where 条件查找数据，可选参数 timeSerialize 控制是否进行时间序列化
const find = async function (where, timeSerialize = true) {
    const context = extension_1.Prisma.getExtensionContext(this);
    return await prismaFind.find(context, where, timeSerialize);
};
exports.find = find;
// 异步函数，根据给定的 where 条件查找数据，可选参数 timeSerialize 控制是否进行时间序列化
const findOne = async function (where, timeSerialize = true) {
    const context = extension_1.Prisma.getExtensionContext(this);
    return await prismaFind.findOne(context, where, timeSerialize);
};
exports.findOne = findOne;
// 异步函数，执行软删除操作，根据给定的 where 条件进行软删除
const softDeletion = async function (where) {
    const context = extension_1.Prisma.getExtensionContext(this);
    return await (0, softDeletion_1.softDeletion)(context, where);
};
exports.softDeletion = softDeletion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFDakMscUNBQW9DO0FBQ3BDLGlEQUFtRTtBQUNuRSx3REFBaUQ7QUFLakQsMEJBQTBCO0FBQ25CLE1BQU0sUUFBUSxHQUFHLEtBQUssV0FBdUIsS0FBcUI7SUFDdkUsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQTtJQUN4QixNQUFNLE9BQU8sR0FBRyxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELE9BQU8sTUFBTSxJQUFBLGVBQU0sRUFBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDckMsQ0FBQyxDQUFBO0FBSlksUUFBQSxRQUFRLFlBSXBCO0FBRUQseURBQXlEO0FBQ2xELE1BQU0sSUFBSSxHQUFHLEtBQUssV0FFdkIsS0FBcUIsRUFDckIsYUFBYSxHQUFHLElBQUk7SUFFcEIsTUFBTSxPQUFPLEdBQUcsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNoRCxPQUFPLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQTtBQVBZLFFBQUEsSUFBSSxRQU9oQjtBQUNELHlEQUF5RDtBQUNsRCxNQUFNLE9BQU8sR0FBRyxLQUFLLFdBRTFCLEtBQXFCLEVBQ3JCLGFBQWEsR0FBRyxJQUFJO0lBRXBCLE1BQU0sT0FBTyxHQUFHLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEQsT0FBTyxNQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQTtBQUNoRSxDQUFDLENBQUE7QUFQWSxRQUFBLE9BQU8sV0FPbkI7QUFFRCxtQ0FBbUM7QUFDNUIsTUFBTSxZQUFZLEdBQUcsS0FBSyxXQUF1QixLQUFxQjtJQUMzRSxNQUFNLE9BQU8sR0FBRyxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hELE9BQU8sTUFBTSxJQUFBLDJCQUFrQixFQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUNqRCxDQUFDLENBQUE7QUFIWSxRQUFBLFlBQVksZ0JBR3hCIn0=