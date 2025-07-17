export type IndexLogoResponse = {
  /* LOGO图片的URL地址 */
  src: string

  /** 任意合法数值 */
  [property: string]: any
}

export type IndexSliderResponse = {
  /* 唯一标识 */
  id: string
  /* 图片URL */
  image: string
  /* 标题文字 */
  title: string
  /* 背景颜色 */
  color: string
  }[]

export type IndexCategoriesResponse = {
  /* 分类唯一标识 */
  id?: number
  /* 分类名称 */
  name?: string
  }[]

/**
 *  接口 [文章]
 *  @标签 首页部分/文章
 *  @方式 
 *  @地址 
 *  @更新时间 2025-07-17 21:47:34
 */
export interface IndexPostRequest {
  /* ID 编号 */
  id?: string

  /* 文章列表页 */
  page?: string

  /** 任意合法数值 */
  [property: string]: any
}

export type IndexPostResponse = {
  /* 文章数组 */
  posts: {
  /* 文章唯一标识 */
  id: number
  /* 文章标题 */
  title: string
  /* 发布时间（ISO格式） */
  date: string
  /* 作者信息对象 */
  author: {
  /* 作者ID */
  id: number
  /* 作者昵称 */
  name: string
  /* 作者头像URL */
  avatar: string
  }
  /* 文章所属分类数组 */
  categories: string[]
  /* 文章标签数组 */
  tags: string[]
  /* 文章缩略图URL，false表示无缩略图 */
  thumbnail: boolean
  /* 文章评论数量 */
  comments_count: string
  /* 文章点赞数量 */
  like_count: number
  }[]

  /* 分页信息对象 */
  pagination: {
  /* 当前页码 */
  current_page: number
  /* 每页显示文章数量 */
  per_page: number
  /* 总文章数量 */
  total_posts: number
  /* 总页数 */
  total_pages: number
  }

  /** 任意合法数值 */
  [property: string]: any
}