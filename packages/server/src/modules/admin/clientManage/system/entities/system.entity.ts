import { Table, Column, DataType } from 'sequelize-typescript'
import { BasicEntity } from '../../../../../shared/entities/basic.entity'

@Table({
  tableName: 'client_manage_system'
})
export class SystemEntity extends BasicEntity {
  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '是否使用启动引导,1是0否'
  })
  guide: number

  @Column({
    type: DataType.STRING,
    defaultValue: 'swiper',
    allowNull: false,
    comment: '引导类型，banner和personalize'
  })
  guideType: string
}
