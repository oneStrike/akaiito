import type { PrismaClient } from '../client/client'

export async function createInitialDataDictionary(prisma: PrismaClient) {
  const initData = [
    {
      name: '作品语言',
      code: 'work_language',
    },
    {
      name: '国籍',
      code: 'nationality',
    },
    {
      name: '作品区域',
      code: 'work_region',
    },
    {
      name: '作品出版社',
      code: 'work_publisher',
    },
    {
      name: '作品年龄限制',
      code: 'work_age_rating',
    },
    {
      name: '出版社',
      code: 'work_publisher',
    },
  ]
  const itemData = {
    work_language: [
      {
        name: '中文',
        code: 'zh',
      },
      {
        name: '英文',
        code: 'en',
      },
      {
        name: '日文',
        code: 'jp',
      },
    ],
    work_region: [
      {
        name: '中国',
        code: 'zh',
      },
      {
        name: '美国',
        code: 'en',
      },
      {
        name: '日本',
        code: 'jp',
      },
    ],
    work_age_rating: [
      {
        name: '全年龄',
        code: 'ALL',
      },
      {
        name: 'r15',
        code: 'R15',
      },
      {
        name: 'r18',
        code: 'R18',
      },
    ],
    nationality: [
      {
        name: '中国',
        code: 'CN',
      },
      {
        name: '美国',
        code: 'US',
      },
      {
        name: '日本',
        code: 'JP',
      },
      {
        name: '韩国',
        code: 'KR',
      },
      {
        name: '英国',
        code: 'GB',
      },
      {
        name: '法国',
        code: 'FR',
      },
      {
        name: '德国',
        code: 'DE',
      },
      {
        name: '印度',
        code: 'IN',
      },
      {
        name: '俄罗斯',
        code: 'RU',
      },
      {
        name: '巴西',
        code: 'BR',
      },
    ],
    work_publisher: [
      {
        name: '人民文学出版社',
        code: 'renmin_wenxue_chubanshe',
      },
      {
        name: '人民教育出版社',
        code: 'renmin_jiaoyu_chubanshe',
      },
      {
        name: '人民音乐出版社',
        code: 'renmin_yinyue_chubanshe',
      },
      {
        name: '人民美术出版社',
        code: 'renmin_meishu_chubanshe',
      },
    ],
  }
  for (const item of initData) {
    await prisma.dictionary.upsert({
      where: {
        code: item.code,
      },
      update: item,
      create: item,
    })

    if (!itemData[item.code]) continue

    for (const subItem of itemData[item.code]) {
      // 使用 dictionaryCode + code 做为唯一约束条件
      await prisma.dictionaryItem.upsert({
        where: {
          dictionaryCode_code: {
            dictionaryCode: item.code,
            code: subItem.code,
          },
        },
        update: {
          ...subItem,
          parentDictionary: {
            connect: { code: item.code },
          },
        },
        create: {
          ...subItem,
          parentDictionary: {
            connect: { code: item.code },
          },
        },
      })
    }
  }
}
