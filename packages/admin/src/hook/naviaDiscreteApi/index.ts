
import {
  type ConfigProviderProps,
  createDiscreteApi,
  darkTheme,
  lightTheme
} from 'naive-ui'

export const themeRef = ref<'light' | 'dark'>('light')
const configProviderPropsRef = computed<ConfigProviderProps>(() => ({
  theme: themeRef.value === 'light' ? lightTheme : darkTheme
}))

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar'],
  {
    configProviderProps: configProviderPropsRef
  }
)

export const useMessage = message
export const useNotification = notification
export const useDialog = dialog
export const useLoadingBar = loadingBar

export default {
	useMessage,useNotification,useDialog,useLoadingBar
}	
