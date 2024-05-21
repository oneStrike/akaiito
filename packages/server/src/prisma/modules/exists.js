"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exists = void 0;
// 检查指定条件的记录是否存在
const exists = async (context, where) => {
    // 在数据库中查找符合条件的第一条记录
    const result = await context.findFirst({ where });
    // 如果找到了记录，返回 true；否则返回 false
    return result !== null;
};
exports.exists = exists;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZXhpc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdCQUFnQjtBQUNULE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBSyxPQUFVLEVBQUUsS0FBVSxFQUFFLEVBQUU7SUFDeEQsb0JBQW9CO0lBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU8sT0FBZSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDMUQsNkJBQTZCO0lBQzdCLE9BQU8sTUFBTSxLQUFLLElBQUksQ0FBQTtBQUN4QixDQUFDLENBQUE7QUFMWSxRQUFBLE1BQU0sVUFLbEIifQ==