import { WhereOptions } from "sequelize";
import { FindAttributeOptions } from "sequelize/types/model";
import { ListQueryOptions } from "../dto/list";

export interface FindMultipleMappingOptions {
  where: WhereOptions;
  listOptions?: ListQueryOptions;
  withDeleted?: boolean;
}

export interface FindMultipleServiceOptions {
  params: ListQueryOptions & Record<string | symbol, any>;
  attributes?: FindAttributeOptions;
  likeKeys?: RegExpMatch | null;
  nullKeys?: NullReg | null;
}

/**
 * 生成like语句
 * sporadic 只要出现一个就视为匹配成功
 * include 不同的是必须同时出现，但是不限顺序
 *
 */
export type RegExpMatch = Record<string | symbol, "sporadic" | "include">

//关于值为null的查询 is查询为null的数据，not查询非null的数据
export type NullReg = Record<string | symbol, "is" | "not">
