export async function createInitialWorkComicChapters(prisma: any) {
  // 为每部漫画创建一些示例章节
  const chapterData = [
    {
      comicName: '进击的巨人',
      chapters: [
        {
          title: '第1话 致两千年后的你',
          subtitle: '艾伦的梦境与巨人的出现',
          chapterNumber: 1,
          isPublished: true,
          readRule: 0, // 免费
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/aot/ch1/page1.jpg',
            'https://example.com/aot/ch1/page2.jpg',
            'https://example.com/aot/ch1/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-01T00:00:00Z'),
          viewCount: 15000,
          likeCount: 1200,
          commentCount: 85,
        },
        {
          title: '第2话 那一天',
          subtitle: '玛利亚之墙的陷落',
          chapterNumber: 2,
          isPublished: true,
          readRule: 0, // 免费
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/aot/ch2/page1.jpg',
            'https://example.com/aot/ch2/page2.jpg',
            'https://example.com/aot/ch2/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-02T00:00:00Z'),
          viewCount: 12000,
          likeCount: 980,
          commentCount: 67,
        },
        {
          title: '第3话 解散式之夜',
          subtitle: '训练兵团的毕业典礼',
          chapterNumber: 3,
          isPublished: true,
          readRule: 1, // 需要登录
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/aot/ch3/page1.jpg',
            'https://example.com/aot/ch3/page2.jpg',
            'https://example.com/aot/ch3/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-03T00:00:00Z'),
          viewCount: 10000,
          likeCount: 850,
          commentCount: 52,
        },
      ],
    },
    {
      comicName: '海贼王',
      chapters: [
        {
          title: '第1话 ROMANCE DAWN -冒险的黎明-',
          subtitle: '路飞的冒险开始',
          chapterNumber: 1,
          isPublished: true,
          readRule: 0, // 免费
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/op/ch1/page1.jpg',
            'https://example.com/op/ch1/page2.jpg',
            'https://example.com/op/ch1/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-01T00:00:00Z'),
          viewCount: 25000,
          likeCount: 2100,
          commentCount: 150,
        },
        {
          title: '第2话 那个人是"草帽路飞"',
          subtitle: '路飞与克比的相遇',
          chapterNumber: 2,
          isPublished: true,
          readRule: 0, // 免费
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/op/ch2/page1.jpg',
            'https://example.com/op/ch2/page2.jpg',
            'https://example.com/op/ch2/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-02T00:00:00Z'),
          viewCount: 22000,
          likeCount: 1850,
          commentCount: 125,
        },
      ],
    },
    {
      comicName: '鬼灭之刃',
      chapters: [
        {
          title: '第1话 残酷',
          subtitle: '炭治郎一家的悲剧',
          chapterNumber: 1,
          isPublished: true,
          readRule: 0, // 免费
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/ds/ch1/page1.jpg',
            'https://example.com/ds/ch1/page2.jpg',
            'https://example.com/ds/ch1/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-01T00:00:00Z'),
          viewCount: 18000,
          likeCount: 1500,
          commentCount: 95,
        },
        {
          title: '第2话 育手・鳞泷左近次',
          subtitle: '炭治郎的修行开始',
          chapterNumber: 2,
          isPublished: true,
          readRule: 1, // 需要登录
          purchaseAmount: 0,
          contents: JSON.stringify([
            'https://example.com/ds/ch2/page1.jpg',
            'https://example.com/ds/ch2/page2.jpg',
            'https://example.com/ds/ch2/page3.jpg',
          ]),
          isPreview: false,
          publishAt: new Date('2024-01-02T00:00:00Z'),
          viewCount: 15000,
          likeCount: 1200,
          commentCount: 78,
        },
      ],
    },
  ]

  for (const comicData of chapterData) {
    const comic = await prisma.workComic.findFirst({
      where: { name: comicData.comicName },
    })

    if (comic) {
      for (const chapterInfo of comicData.chapters) {
        const existingChapter = await prisma.workComicChapter.findFirst({
          where: {
            comicId: comic.id,
            chapterNumber: chapterInfo.chapterNumber,
            versionId: null, // 原版章节
          },
        })

        if (!existingChapter) {
          await prisma.workComicChapter.create({
            data: {
              ...chapterInfo,
              comicId: comic.id,
              versionId: null, // 原版章节
            },
          })
        }
      }
    }
  }

  console.log('✅ 漫画章节种子数据初始化完成')
}
