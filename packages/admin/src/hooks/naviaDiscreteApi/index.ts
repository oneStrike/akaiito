// 导入所需的模块和变量
import {
  type ConfigProviderProps,
  createDiscreteApi,
  darkTheme,
  lightTheme
} from 'naive-ui'

// 创建一个响应式变量来存储当前主题
export const themeRef = ref<'light' | 'dark'>('light')

// 创建一个计算属性来生成ConfigProviderProps对象
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

// 使用createDiscreteApi函数创建message、notification、dialog和loadingBar对象
const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)

// 导出各个对象作为自定义的hooks
export const useMessage = message
export const useNotification = notification
export const useDialog = dialog
export const useLoadingBar = loadingBar

// 导出默认对象
export default {
  useMessage,
  useNotification,
  useDialog,
  useLoadingBar
}
