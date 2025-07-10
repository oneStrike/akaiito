export async function createInitialWorkComicRelations(prisma: any) {
  // 创建漫画作者关联关系
  const comicAuthorRelations = [
    {
      comicName: '进击的巨人',
      authorName: '諫山創',
      roleType: 1, // 原作者
      isPrimary: true,
      sortOrder: 1,
    },
    {
      comicName: '海贼王',
      authorName: '尾田栄一郎',
      roleType: 1, // 原作者
      isPrimary: true,
      sortOrder: 1,
    },
    {
      comicName: '鬼灭之刃',
      authorName: '吾峠呼世晴',
      roleType: 1, // 原作者
      isPrimary: true,
      sortOrder: 1,
    },
    {
      comicName: '你的名字',
      authorName: '新海誠',
      roleType: 1, // 原作者
      isPrimary: true,
      sortOrder: 1,
    },
    {
      comicName: '龙珠',
      authorName: '鳥山明',
      roleType: 1, // 原作者
      isPrimary: true,
      sortOrder: 1,
    },
  ]

  // 创建漫画分类关联关系
  const comicCategoryRelations = [
    {
      comicName: '进击的巨人',
      categoryName: '热血',
      isPrimary: true,
      weight: 100,
    },
    {
      comicName: '海贼王',
      categoryName: '热血',
      isPrimary: true,
      weight: 100,
    },
    {
      comicName: '鬼灭之刃',
      categoryName: '热血',
      isPrimary: true,
      weight: 100,
    },
    {
      comicName: '你的名字',
      categoryName: '温馨',
      isPrimary: true,
      weight: 100,
    },
    {
      comicName: '龙珠',
      categoryName: '热血',
      isPrimary: true,
      weight: 100,
    },
  ]

  // 处理作者关联
  for (const relation of comicAuthorRelations) {
    const comic = await prisma.workComic.findFirst({
      where: { name: relation.comicName },
    })
    const author = await prisma.workAuthor.findFirst({
      where: { name: relation.authorName },
    })

    if (comic && author) {
      const existingRelation = await prisma.workComicAuthor.findFirst({
        where: {
          comicId: comic.id,
          authorId: author.id,
        },
      })

      if (!existingRelation) {
        await prisma.workComicAuthor.create({
          data: {
            comicId: comic.id,
            authorId: author.id,
            roleType: relation.roleType,
            isPrimary: relation.isPrimary,
            sortOrder: relation.sortOrder,
          },
        })
      }
    }
  }

  // 处理分类关联
  for (const relation of comicCategoryRelations) {
    const comic = await prisma.workComic.findFirst({
      where: { name: relation.comicName },
    })
    const category = await prisma.workCategory.findFirst({
      where: { name: relation.categoryName },
    })

    if (comic && category) {
      const existingRelation = await prisma.workComicCategory.findFirst({
        where: {
          comicId: comic.id,
          categoryId: category.id,
        },
      })

      if (!existingRelation) {
        await prisma.workComicCategory.create({
          data: {
            comicId: comic.id,
            categoryId: category.id,
            isPrimary: relation.isPrimary,
            weight: relation.weight,
          },
        })
      }
    }
  }

  console.log('✅ 漫画关联关系种子数据初始化完成')
}
