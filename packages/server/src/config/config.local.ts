import { MidwayConfig } from '@midwayjs/core'

export default {
  sequelize: {
    dataSource: {
      default: {
        dialect: 'mysql',
        host: 'localhost',
        benchmark: true,
        port: 3306,
        username: 'root',
        password: '15839038112',
        database: 'foo',
        sync: true,
        entities: ['**/entities/**'],
        timezone: '+08:00',
        logging: false,

        define: {
          timestamps: true,
          charset: 'utf8mb4',
          paranoid: false, // 此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
          underscored: true, // 所有属性设置下划线
          freezeTableName: true //不会尝试更改模型名以获取表名。否则，型号名称将是复数
        },
        dialectOptions: {
          // 此处配置将直接传给数据库
          connectTimeout: 30000, // 单次查询连接超时时间
          dateStrings: true, // 不会返回UTC格式时间
          typeCast: true, // 驼峰命名
          bigNumberStrings: true // bigInt和decimal 以字符串返回
        },
        repositoryMode: true
      }
    }
  }
} as MidwayConfig
