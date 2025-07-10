export async function createInitialClientConfig(prisma: any) {
  // 检查是否已存在配置
  const existingConfig = await prisma.clientConfig.findFirst({
    where: { isActive: true },
  })

  if (!existingConfig) {
    await prisma.clientConfig.create({
      data: {
        appLogo: 'https://example.com/logo.png',
        appName: 'AkaiIto漫画',
        appDesc: '专业的漫画阅读平台，提供海量优质漫画资源',
        appVersion: '1.0.0',
        novelStatus: 2, // 开发中
        comicStatus: 1, // 启用
        photoStatus: 2, // 开发中
        videoStatus: 2, // 开发中
        themeColor: '#1890ff',
        darkMode: false,
        language: 'zh-CN',
        allowRegister: true,
        guestMode: true,
        maintenanceMsg: null,
        clientStatus: 0, // 正常
        isActive: true,
        createdBy: 1, // 管理员创建
        updatedBy: 1,
      },
    })
  }

  console.log('✅ 客户端配置种子数据初始化完成')
}
