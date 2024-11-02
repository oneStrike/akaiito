# 移动端基础脚手架-Vue3-UniApp

## 组件自定义属性

| 方法               | 说明        |
|------------------|-----------|
| $dayjs           | dayjs     |
| $filePath        | 拼接图片完整地址  |
| $backgroundImage | 拼接背景图完整地址 |

```vue
<text>
  {{$dayjs().format('YYYY-MM-DD')}}
</text>

<image :src="$filePath('image.png')"></image>

<view :style="{background:$backgrountImage('backgrountImage.png')}"></view>
```

## 路由

支持`pages.json`内自定义字段和拦截器

### 基础使用

所有都依赖于`useRouter()`，和`uni-app`的路由系统所支持的方法一致

区别在于所有的跳转方法都支持传参，包括`tabbar`页面

不过`tabbar`页面获取参数需要使用在`useRouter().getQuery()`

```js
// 方式一
useRouter().navigateTo({
  path: 'pages/home/index',
  query: {
    a: 'bb',
  },
})

// 方式二
// 使用name字段需要在pages.json中配置
useRouter().navigateTo({
  name: 'homePage',
  query: {
    a: 'bb',
  },
})
```

```json
{
  "pages": [
    {
      "path": "pages/tabBar/home/home",
      // 指定页面的name字段
      "name": "homePage",
      "style": {
        "navigationBarTitleText": "首页"
      }
    }
  ]
}
```

| 方法                   | 说明                      |
|----------------------|-------------------------|
| navigateTo           | 同uni-app方法              |
| redirectTo           | 同uni-app方法              |
| reLaunch             | 同uni-app方法              |
| switchTab            | 同uni-app方法              |
| navigateBack         | 同uni-app方法              |
| getRoute             | 获取当前页面在pages.json中的配置信息 |
| getQuery             | 获取页面参数，支持tabbar页面       |
| isTabBarPage         | 当前页面是否为tabbar页面         |
| getRouteByNameOrPath | 通过路径或者name获取页面信息        |
| currentPageInfo      | 当前页面栈信息                 |
| reLoad               | 执行当前页面onLoad生命周期        |
| injectReLoad         | 注入页面刷新机制                |

### 页面刷新

### 鉴权思路

在`main.ts`中激活组件库的时候可以传递导航守卫，实现鉴权相关的操作

在`routerGuard`方法中，会将路由在`pages.json`中的信息传递给参数

对于一些简单的本地鉴权思路，可以在`pages.json`配置鉴权信息

然后在`routerGuard`方法中进行鉴权操作

```ts
// main.ts
useEs.setup({
  routerGuard: authentication.guard,
})
```

**类型声明**

```ts
import type { RouterJumpMethodEnum } from '@/components/libs/enum/router'
import type { IterateObject } from '@/types/global'

export interface PageStyle {
  navigationStyle: 'default' | 'custom'
  navigationBarTitleText?: string
}

export type Pages = {
  path: string
  name?: string
  meta?: IterateObject
  root?: string
  auth?: string
  tabBar: boolean
  subPage: boolean
  style?: PageStyle
} & IterateObject

export interface IRouter {
  path?: string
  name?: string
  query?: IterateObject
  method?: RouterJumpMethodEnum
}

export interface BackOptions {
  /* 延迟多少时间后返回  毫秒 */
  delay?: number
  /* 返回的页数 */
  delta?: number
  /* 传递给目标页面的参数 */
  query?: IterateObject
  /* 是否触发目标页面的刷新机制 */
  refresh?: boolean
  /* 刷新多少张页面 */
  refreshCount?: number
}
```

### 动态调整导航栏标题

可以在`routerEnter`方法中进行操作

方法接受两个参数，分为是`路由信息`和`查询参数`

实现思路是在方法跳转的时候将导航栏标题当作`查询参数`进行传递

```ts
import { nextTick } from '@vue/runtime-core'

useEs.setup({
  routerEnter: authentication.enter,
})

function enter(route, query) {
  // 在H5平台需要放在nextTick中
  nextTick(() => {
    uni.setNavigationBarTitle({
      title: '导航栏标题',
    })
  })
}
```

## 模态框

主要是为了解决`uni.showModal()`方法在`安卓APP`中调用系统自带的方法

系统方法的默认样式比较过时，同时不支持修改样式

如果不需要兼容兼容`安卓APP`,那么就没必要使用这个方法

```js
useModal({
  title: '提示',
  content: '提示内容',
  showCancel: true,
  backButton: true,
  cancelText: '取消',
  cancelColor: '#000000',
  confirmText: '确定',
  confirmColor: '#3CC51F',
  complete: false,
})
```

## 图标

不推荐使用字体图标，推荐使用`svg`作为图标

支持本地和网络两种加载方式

具体支持的属性请查看 `/components/es-icons/es-icons/.vue`

### 本地图标

本地图标需要将文件放在`/static/icons`目录下，在程序启动的时候会自动处理

```vue
<!-- /static/icons/search.svg -->
<!-- 使用文件名作为name属性 -->
<es-icons name="search" />
```

### 网络图标

网络图标需要在`/static/icons/icon-mapping.ts`文件中配置映射关系

可以在`https://icones.netlify.app`中挑选图标，并且将图标的名字和`es-icons`的`name`属性映射

```js
/*
* search 为es-icons的name属性值
* majesticons:search-line 是在https://icones.netlify.app中的名字
* */
export const iconMapping = {
  search: 'majesticons:search-line',
}
```

```vue
<es-icons name="search" />
```

## pinia持久化

使用`pinia-plugin-persistedstate`插件实现持久化

如果只兼容`H5`的话，按照插件官方文档操作就行

如果需要兼容其他平台，必须使用`uni-app`的方法

**兼容其他平台**

```ts
export const useUserStore = defineStore('useUserStore', {
  state() {
    return {}
  },
  persist: {
    storage: {
      setItem(key: string, value: any) {
        uni.setStorageSync(key, value)
      },
      getItem(key: string) {
        return uni.getStorageSync(key)
      },
    },
  },
})
```
