/**
 * 根据给定的选项查找数据。
 * @param context - 上下文对象。
 * @param options - 选项对象。
 * @param timeSerialize - 是否序列化时间的布尔值。
 * @returns 返回一个解析为结果的 Promise。
 */
export declare const find: <T>(context: any, options: any, timeSerialize: boolean) => Promise<T>;
export declare const findOne: <T>(context: any, options: any, timeSerialize: boolean) => Promise<T>;
