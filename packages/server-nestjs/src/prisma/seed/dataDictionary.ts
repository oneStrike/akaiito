/**
 * 数据字典种子数据接口
 */
interface IDictionaryData {
  name: string
  code: string
}

interface IDictionaryItemData {
  name: string
  code: string
}

/**
 * 创建初始数据字典数据
 * @param prisma Prisma客户端实例
 */
export async function createInitialDataDictionary(prisma: any) {
  // 初始化数据字典数据
  const initData: IDictionaryData[] = [
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
  ]
  // 数据字典项数据
  const itemData: Record<string, IDictionaryItemData[]> = {
    work_language: [
      {
        name: '中文',
        code: 'ZH',
      },
      {
        name: '英文',
        code: 'EN',
      },
      {
        name: '日文',
        code: 'JP',
      },
      {
        name: '韩文',
        code: 'KR',
      },
      {
        name: '法文',
        code: 'FR',
      },
    ],
    work_region: [
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
        name: '欧洲',
        code: 'EU',
      },
    ],
    work_age_rating: [
      {
        name: '全年龄',
        code: 'ALL',
      },
      {
        name: 'R15',
        code: 'R15',
      },
      {
        name: 'R18',
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
      {
        name: '集英社',
        code: 'shueisha',
      },
      {
        name: '小学馆',
        code: 'shogakukan',
      },
    ],
  }
  console.log('开始初始化数据字典种子数据...')

  for (const item of initData) {
    // 检查数据字典是否已存在
    const existingDictionary = await prisma.dictionary.findFirst({
      where: { code: item.code },
    })

    if (!existingDictionary) {
      await prisma.dictionary.create({
        data: item,
      })
      console.log(`✓ 创建数据字典: ${item.name} (${item.code})`)
    } else {
      console.log(`- 数据字典已存在，跳过: ${item.name} (${item.code})`)
    }

    // 处理字典项数据
    if (!itemData[item.code]) continue

    for (const subItem of itemData[item.code]) {
      // 检查字典项是否已存在
      const existingItem = await prisma.dictionaryItem.findFirst({
        where: {
          dictionaryCode: item.code,
          code: subItem.code,
        },
      })

      if (!existingItem) {
        await prisma.dictionaryItem.create({
          data: {
            ...subItem,
            parentDictionary: {
              connect: { code: item.code },
            },
          },
        })
        console.log(`  ✓ 创建字典项: ${subItem.name} (${subItem.code})`)
      } else {
        console.log(`  - 字典项已存在，跳过: ${subItem.name} (${subItem.code})`)
      }
    }
  }

  console.log('✅ 数据字典种子数据初始化完成')
}
