import { Table, Column, DataType } from "sequelize-typescript";
import { BaseEntity } from "../../../shared/entities/basic.entity";


//社交圈子分类
@Table({
  tableName: "social_circle_classify"
})
export class SocialCircleClassifyEntity extends BaseEntity {
  @Column({
    comment: "分类名称",
    type: DataType.STRING(50),
    unique: true,
    allowNull: false
  })
  classifyName: string;


  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    comment: "排序"
  })
  sort: number;
}

@Table({
  tableName: "social_circle"
})
export class SocialCircleEntity extends BaseEntity {
  @Column({
    comment: "圈子名称",
    type: DataType.STRING(50),
    unique: true
  })
  name: string;

  @Column({
    comment: "图标",
    type: DataType.STRING,
    allowNull: false
  })
  icon?: string;

  @Column({
    comment: "封面",
    type: DataType.STRING,
    allowNull: false
  })
  cover?: string;

  @Column({
    comment: "创建者id",
    type: DataType.INTEGER
  })
  creatorId: number;

  @Column({
    comment: "创建者名字",
    type: DataType.STRING(50),
    allowNull: false
  })
  creatorName: number;


  @Column({
    comment: "分类id",
    type: DataType.INTEGER
  })
  classifyId: number;


  @Column({
    comment: "分类名字",
    type: DataType.STRING(50)
  })
  classifyName: number;

  @Column({
    comment: "描述",
    type: DataType.STRING,
    allowNull: false
  })
  desc: number;

  @Column({
    comment: "成员称号",
    type: DataType.STRING(50),
    allowNull: false
  })
  memberTitle: number;

  @Column({
    comment: "关注人数",
    type: DataType.INTEGER,
    defaultValue: 0
  })
  followers: number;

  @Column({
    comment: "虚拟关注人数",
    type: DataType.INTEGER,
    defaultValue: 0
  })
  vFollowers: number;

  @Column({
    comment: "规则",
    type: DataType.STRING,
    allowNull: false
  })
  rule: string;

  @Column({
    comment: "是否展示在引导页面，1是 0否",
    type: DataType.TINYINT,
    defaultValue: 0
  })
  guide: number;

  @Column({
    comment: "状态  1正常 0封禁",
    type: DataType.TINYINT,
    defaultValue: 0
  })
  status: number;

  @Column({
    comment: "封禁的原因",
    type: DataType.STRING
  })
  bannedReason?: string;
}
