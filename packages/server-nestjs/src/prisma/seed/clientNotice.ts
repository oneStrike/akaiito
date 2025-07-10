export async function createInitialClientNotice(prisma: any) {
  const initData = [
    {
      title: '欢迎使用漫画阅读平台',
      content:
        '欢迎来到我们的漫画阅读平台！这里有丰富的漫画资源，优质的阅读体验。请遵守平台规则，享受愉快的阅读时光。',
      noticeType: 0, // 系统通知
      priorityLevel: 1, // 中等优先级
      publishStartTime: new Date('2024-01-01T00:00:00Z'),
      publishEndTime: new Date('2025-12-31T23:59:59Z'),
      pageCode: 'home',
      isPublished: true,
      enablePlatform: 7, // 1+2+4 = H5+APP+小程序
      isPinned: true,
      showAsPopup: false,
      order: 100,
    },
    {
      title: '平台功能更新公告',
      content:
        '我们持续优化平台功能，提升用户体验。最新版本增加了书签功能、阅读历史记录、个性化推荐等特性。感谢您的支持！',
      noticeType: 3, // 更新公告
      priorityLevel: 2, // 高优先级
      publishStartTime: new Date('2024-01-01T00:00:00Z'),
      publishEndTime: new Date('2024-12-31T23:59:59Z'),
      pageCode: 'home',
      isPublished: true,
      enablePlatform: 7, // 1+2+4 = H5+APP+小程序
      isPinned: false,
      showAsPopup: true,
      order: 90,
    },
    {
      title: '用户行为规范提醒',
      content:
        '为了维护良好的社区环境，请用户遵守以下规范：\n1. 不发布违法违规内容\n2. 尊重他人，文明交流\n3. 不恶意刷屏或灌水\n4. 保护个人隐私信息\n违反规范的用户将面临相应处罚。',
      noticeType: 0, // 系统通知
      priorityLevel: 1, // 中等优先级
      publishStartTime: new Date('2024-01-01T00:00:00Z'),
      publishEndTime: new Date('2025-12-31T23:59:59Z'),
      pageCode: 'terms',
      isPublished: true,
      enablePlatform: 7, // 1+2+4 = H5+APP+小程序
      isPinned: false,
      showAsPopup: false,
      order: 80,
    },
    {
      title: 'VIP会员权益介绍',
      content:
        'VIP会员享有以下专属权益：\n1. 无广告阅读体验\n2. 提前阅读最新章节\n3. 高清画质支持\n4. 专属客服服务\n5. 会员专区内容访问\n立即升级VIP，享受更优质的服务！',
      noticeType: 1, // 活动公告
      priorityLevel: 2, // 高优先级
      publishStartTime: new Date('2024-01-01T00:00:00Z'),
      publishEndTime: new Date('2024-12-31T23:59:59Z'),
      pageCode: 'vip_center',
      isPublished: true,
      enablePlatform: 7, // 1+2+4 = H5+APP+小程序
      isPinned: false,
      showAsPopup: false,
      order: 70,
    },
    {
      title: '系统维护通知',
      content:
        '为了提供更好的服务，我们将在每周三凌晨2:00-4:00进行系统维护。维护期间可能会影响部分功能的正常使用，请您谅解。',
      noticeType: 2, // 维护通知
      priorityLevel: 1, // 中等优先级
      publishStartTime: new Date('2024-01-01T00:00:00Z'),
      publishEndTime: new Date('2025-12-31T23:59:59Z'),
      pageCode: null,
      isPublished: true,
      enablePlatform: 7, // 1+2+4 = H5+APP+小程序
      isPinned: false,
      showAsPopup: false,
      order: 60,
    },
  ]

  for (const item of initData) {
    // 由于没有唯一约束，我们使用title作为判断条件
    const existingNotice = await prisma.clientNotice.findFirst({
      where: { title: item.title },
    })

    if (!existingNotice) {
      await prisma.clientNotice.create({
        data: item,
      })
    }
  }

  console.log('✅ 客户端通知种子数据初始化完成')
}
