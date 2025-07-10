/**
 * 作品分类种子数据接口
 */
interface IWorkCategoryData {
  name: string
  contentTypes: number
}

/**
 * 创建初始作品分类数据
 * @param prisma Prisma客户端实例
 */
export async function createInitialWorkCategory(prisma: any) {
  // 初始化作品分类数据
  const INITIAL_WORK_CATEGORIES: IWorkCategoryData[] = [
    {
      name: '百合',
      contentTypes: 15,
    },
    {
      name: '热血',
      contentTypes: 15,
    },
    {
      name: '温馨',
      contentTypes: 15,
    },
    {
      name: '校园',
      contentTypes: 15,
    },
    {
      name: '恋爱',
      contentTypes: 15,
    },
    {
      name: '冒险',
      contentTypes: 15,
    },
    {
      name: '科幻',
      contentTypes: 15,
    },
    {
      name: '悬疑',
      contentTypes: 15,
    },
  ]

  // 遍历初始数据，检查是否存在，不存在则创建
  for (const categoryData of INITIAL_WORK_CATEGORIES) {
    const existingCategory = await prisma.workCategory.findFirst({
      where: { name: categoryData.name },
    })

    if (!existingCategory) {
      await prisma.workCategory.create({
        data: categoryData,
      })
    }
  }

  console.log('✅ 作品分类种子数据初始化完成')
}
