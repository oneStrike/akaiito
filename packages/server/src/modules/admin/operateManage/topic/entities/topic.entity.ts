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
    type: DataType.STRING(10),
    allowNull: false,
    comment: '副标题'
  })
  subTitle: string

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
}
