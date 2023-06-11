import { Table, Column, DataType, ForeignKey } from "sequelize-typescript";
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
    type: DataType.STRING
  })
  icon?: string;

  @Column({
    comment: "封面",
    type: DataType.STRING
  })
  cover?: string;

  @Column({
    comment: "分类id",
    type: DataType.INTEGER
  })
  classifyId: number;


  @ForeignKey(() => SocialCircleClassifyEntity)
  @Column({
    comment: "分类名字",
    type: DataType.STRING
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
    type: DataType.STRING,
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
    defaultValue: 0
  })
  rule: string;

  @Column({
    comment: "是否展示在引导页面，1是 0否",
    type: DataType.TINYINT,
    defaultValue: 0
  })
  guide: number;

  @Column({
    comment: "状态 0审核中 1正常 2审核失败 3封禁",
    type: DataType.TINYINT,
    defaultValue: 0
  })
  status: number;
}
