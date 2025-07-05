import {
  AuthorGenderEnum,
  AuthorRoleEnum,
} from '../../modules/admin/work/author/author.constant'

export async function createInitialAuthors(prisma: any) {
  const initData = [
    {
      name: '村上春树',
      avatar: 'https://example.com/avatars/haruki-murakami.jpg',
      description: '日本著名小说家，代表作有《挪威的森林》、《海边的卡夫卡》等',
      isEnabled: true,
      roles: AuthorRoleEnum.WRITER,
      nationality: '日本',
      gender: AuthorGenderEnum.MALE,
      socialLinks: JSON.stringify({
        twitter: '@haruki_murakami',
        instagram: '@murakami_official',
      }),
      remark: '国际知名作家，作品深受读者喜爱',
      worksCount: 0,
      followersCount: 0,
      featured: true,
    },
    {
      name: '东野圭吾',
      avatar: 'https://example.com/avatars/keigo-higashino.jpg',
      description: '日本推理小说家，代表作有《白夜行》、《嫌疑人X的献身》等',
      isEnabled: true,
      roles: AuthorRoleEnum.WRITER,
      nationality: '日本',
      gender: AuthorGenderEnum.MALE,
      socialLinks: JSON.stringify({
        website: 'https://higashino-keigo.com',
      }),
      remark: '推理小说大师，作品逻辑严密',
      worksCount: 0,
      followersCount: 0,
      featured: true,
    },
    {
      name: '尾田荣一郎',
      avatar: 'https://example.com/avatars/eiichiro-oda.jpg',
      description: '日本漫画家，《海贼王》作者',
      isEnabled: true,
      roles: AuthorRoleEnum.CARTOONIST,
      nationality: '日本',
      gender: AuthorGenderEnum.MALE,
      socialLinks: JSON.stringify({
        twitter: '@Eiichiro_Staff',
      }),
      remark: '世界知名漫画家，海贼王创作者',
      worksCount: 0,
      followersCount: 0,
      featured: true,
    },
    {
      name: '鸟山明',
      avatar: 'https://example.com/avatars/akira-toriyama.jpg',
      description: '日本漫画家，《龙珠》、《阿拉蕾》作者',
      isEnabled: true,
      roles: AuthorRoleEnum.CARTOONIST,
      nationality: '日本',
      gender: AuthorGenderEnum.MALE,
      socialLinks: JSON.stringify({}),
      remark: '传奇漫画家，影响了一代人',
      worksCount: 0,
      followersCount: 0,
      featured: true,
    },
    {
      name: '新海诚',
      avatar: 'https://example.com/avatars/makoto-shinkai.jpg',
      description: '日本动画导演、编剧，代表作有《你的名字》、《天气之子》等',
      isEnabled: true,
      roles: AuthorRoleEnum.WRITER | AuthorRoleEnum.ILLUSTRATOR,
      nationality: '日本',
      gender: AuthorGenderEnum.MALE,
      socialLinks: JSON.stringify({
        twitter: '@shinkaimakoto',
        website: 'https://shinkaimakoto.jp',
      }),
      remark: '知名动画导演，擅长青春题材',
      worksCount: 0,
      followersCount: 0,
      featured: false,
    },
  ]

  for (const item of initData) {
    await prisma.workAuthor.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    })
  }

  console.log('✅ 作者种子数据创建完成')
}
