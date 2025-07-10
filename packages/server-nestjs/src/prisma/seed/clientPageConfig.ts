export async function createInitialClientPageConfig(prisma: any) {
  const initData = [
    {
      pageCode: 'home',
      pagePath: '/',
      pageName: '首页',
      pageTitle: '首页 - 漫画阅读平台',
      accessLevel: 0, // 游客可访问
      pageStatus: 1, // 启用
      description: '平台首页，展示推荐内容和热门作品',
    },
    {
      pageCode: 'comic_list',
      pagePath: '/comic/list',
      pageName: '漫画列表',
      pageTitle: '漫画列表 - 漫画阅读平台',
      accessLevel: 0,
      pageStatus: 1,
      description: '漫画作品列表页面',
    },
    {
      pageCode: 'comic_detail',
      pagePath: '/comic/detail',
      pageName: '漫画详情',
      pageTitle: '漫画详情 - 漫画阅读平台',
      accessLevel: 0,
      pageStatus: 1,
      description: '漫画作品详情页面',
    },
    {
      pageCode: 'comic_reader',
      pagePath: '/comic/reader',
      pageName: '漫画阅读',
      pageTitle: '漫画阅读 - 漫画阅读平台',
      accessLevel: 1, // 需要登录
      pageStatus: 1,
      description: '漫画在线阅读页面',
    },
    {
      pageCode: 'user_center',
      pagePath: '/user/center',
      pageName: '个人中心',
      pageTitle: '个人中心 - 漫画阅读平台',
      accessLevel: 1, // 需要登录
      pageStatus: 1,
      description: '用户个人中心页面',
    },
    {
      pageCode: 'user_profile',
      pagePath: '/user/profile',
      pageName: '个人资料',
      pageTitle: '个人资料 - 漫画阅读平台',
      accessLevel: 1, // 需要登录
      pageStatus: 1,
      description: '用户个人资料设置页面',
    },
    {
      pageCode: 'vip_center',
      pagePath: '/vip/center',
      pageName: 'VIP中心',
      pageTitle: 'VIP中心 - 漫画阅读平台',
      accessLevel: 2, // 需要会员
      pageStatus: 1,
      description: 'VIP会员专属页面',
    },
    {
      pageCode: 'about',
      pagePath: '/about',
      pageName: '关于我们',
      pageTitle: '关于我们 - 漫画阅读平台',
      accessLevel: 0,
      pageStatus: 1,
      description: '平台介绍和联系方式',
    },
    {
      pageCode: 'privacy',
      pagePath: '/privacy',
      pageName: '隐私政策',
      pageTitle: '隐私政策 - 漫画阅读平台',
      accessLevel: 0,
      pageStatus: 1,
      description: '用户隐私政策说明',
    },
    {
      pageCode: 'terms',
      pagePath: '/terms',
      pageName: '服务条款',
      pageTitle: '服务条款 - 漫画阅读平台',
      accessLevel: 0,
      pageStatus: 1,
      description: '平台服务条款和使用协议',
    },
  ]

  for (const item of initData) {
    await prisma.clientPageConfig.upsert({
      where: { pageCode: item.pageCode },
      update: item,
      create: item,
    })
  }

  console.log('✅ 客户端页面配置种子数据初始化完成')
}
