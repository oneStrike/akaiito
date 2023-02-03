import { Column, DataType, Table } from 'sequelize-typescript'
import { BaseEntity } from '../../../../../shared/entities/basic.entity'

@Table({
  tableName: 'topic'
})
export class TopicEntity extends BaseEntity {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
    comment: '话题'
  })
  topicName: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '副标题'
  })
  desc: string

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    comment: '创建方式，1管理员 2用户'
  })
  creationMethod: number

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    comment: '称呼'
  })
  call: string

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '话题头像'
  })
  topicAvatar: string

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '活跃人数'
  })
  activePeople: number

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '活跃人数模拟'
  })
  activePeopleMock: number

  @Column({
    type: DataType.TEXT,
    comment: '倡导规则'
  })
  advocateRules: string

  @Column({
    type: DataType.TEXT,
    comment: '禁止规则'
  })
  forbidRules: string

  @Column({
    type: DataType.TINYINT,
    defaultValue: 1,
    comment: '状态 1正常 0拉黑'
  })
  status: number

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    comment: '成员数量'
  })
  memberCount: number
}
