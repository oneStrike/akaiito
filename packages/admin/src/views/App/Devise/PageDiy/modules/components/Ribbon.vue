<script setup lang="ts">
import draggable from 'vuedraggable'
import type { AdminGetClientPageRes } from '~@/apiTypes/clientManage'
import type { IRibbonFormItem, IRibbonItem } from '~@/diyPage'
import { clientPageApi } from '@/api/client/client'
import { findFormItem } from '@/utils'
import { options } from '@/views/App/Devise/PageDiy/modules/components/shared'
import config from '@/config'

interface IRibbonOp {
  placeholder?: string
  searchBox?: boolean
  maxRibbon?: number
  modelValue: IRibbonItem[] | []
}

const props = withDefaults(defineProps<IRibbonOp>(), {
  placeholder: '请配置功能区',
  searchBox: false,
  maxRibbon: 4,
  modelValue: () => []
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: IRibbonItem[]): void
  (event: 'complete', data: IRibbonItem[]): void
}>()

let formOptions = options()

const ribbonData = ref<IRibbonItem[]>(props.modelValue || [])
const currentRibbon = ref<IRibbonItem>()
const currentFormRibbon = ref<IRibbonFormItem>()
const currentRibbonIndex = ref<number>()
const showRibbon = ref(false)

const defaultRibbon: IRibbonItem = {
  id: ribbonData.value.length + 1,
  ribbonName: '',
  size: 30,
  ribbon: {
    type: ''
  }
}

//将标准格式转换成表单编辑的格式
const antiRibbonData = (val: IRibbonItem): IRibbonFormItem => {
  val = JSON.parse(JSON.stringify(val))
  const ribbon: IRibbonFormItem = {}
  if (val.ribbon.type === 'applet') {
    ribbon.appletName = val.ribbon.appletName
    ribbon.appId = val.ribbon.appId
    ribbon.ribbon = 'applet'
  } else if (val.ribbon.type === 'search') {
    ribbon.searchPlaceholderValue = val.ribbon.searchPlaceholderValue
    ribbon.searchRadius = val.ribbon.searchRadius
    ribbon.ribbon = 'search'
  } else {
    if (val.ribbon.webviewUrl) {
      ribbon.webviewUrl = val.ribbon.webviewUrl
    }
    ribbon.ribbon = val.ribbon.id
  }
  ribbon.size = val.size
  ribbon.autoWidth = !!val.autoWidth
  ribbon.ribbonName = val.ribbonName
  ribbon.icon = val.icon
  ribbon.iconColor = val.iconColor || '#333333'
  return ribbon
}

//展示编辑drawer
const showRibbonDrawer = (index?: number) => {
  currentRibbonIndex.value = index
  const ribbon = ribbonData.value[index || 0] || defaultRibbon
  currentFormRibbon.value = antiRibbonData(ribbon)
  formOptions = options()
  getClientPage()
  showRibbon.value = true
}

//格式化功能选择项
const pageList = ref<AdminGetClientPageRes>()
const getClientPage = async () => {
  pageList.value = pageList.value || (await clientPageApi())
  const selectPageListData: { label: string; value: number | string }[] =
    pageList.value.map((item) => {
      return {
        label: item.pageName,
        value: item.id
      }
    })
  const otherRibbon = [
    {
      label: '跳转小程序',
      value: 'applet'
    },
    {
      label: '搜索框',
      value: 'search'
    }
  ]
  if (!props.searchBox) otherRibbon.pop()
  selectPageListData.unshift(...otherRibbon)
  findFormItem(formOptions, 'ribbon').componentProps.options =
    selectPageListData
}

const closed = () => {
  showRibbon.value = false
  currentRibbon.value = defaultRibbon
}

//处理不同功能区的表单项
const formatFormOptions = () => {
  const ribbonType = currentFormRibbon.value?.ribbon
  if (!ribbonType) return
  const formIcon = currentFormRibbon.value?.icon
  const formAutoWidth = currentFormRibbon.value?.autoWidth
  const ribbonDetail = pageList.value?.find((item) => item.id === ribbonType)
  const icon = findFormItem(formOptions, 'icon')
  const autoWidth = findFormItem(formOptions, 'autoWidth')
  const iconColor = findFormItem(formOptions, 'iconColor')
  const size = findFormItem(formOptions, 'size')
  const appletName = findFormItem(formOptions, 'appletName')
  const appId = findFormItem(formOptions, 'appId')
  const webviewUrl = findFormItem(formOptions, 'webviewUrl')
  const searchPlaceholderValue = findFormItem(
    formOptions,
    'searchPlaceholderValue'
  )
  const searchRadius = findFormItem(formOptions, 'searchRadius')
  icon.hide = false
  autoWidth.hide = true
  iconColor.hide = true
  size.componentProps.bind!.max = 60
  appletName.hide = true
  appId.hide = true
  webviewUrl.hide = true
  searchRadius.hide = true
  searchPlaceholderValue.hide = true

  if (ribbonType) {
    if (ribbonType === 'applet') {
      appletName.hide = false
      appId.hide = false
    } else if (ribbonType === 'search') {
      icon.hide = true
      size.componentProps.bind!.max = 260
      searchRadius.hide = false
      searchPlaceholderValue.hide = false
      autoWidth.hide = false
    } else if (ribbonDetail && ribbonDetail.pageName === 'H5') {
      webviewUrl.hide = false
    }
  }

  //字体图标样式
  if (Array.isArray(formIcon) && formIcon.length) {
    const iconType = formIcon[0].filename?.split('.').pop()
    iconColor.hide =
      !iconType || config.ALLOW_IMAGE_TYPE.includes(iconType || '')
  }
  if (
    currentFormRibbon.value?.icon &&
    !iconColor.hide &&
    icon.componentProps.bind
  ) {
    size.componentProps.bind!.max = 38
    size.componentProps.bind!.min = 20
    icon.componentProps.bind.iconStyle = {
      [currentFormRibbon.value.icon.toString()]: {
        color: currentFormRibbon.value.iconColor,
        size: currentFormRibbon.value.size
      }
    }
  }

  //自适应宽度
  size.componentProps.bind!.disabled = formAutoWidth
}

//currentRibbon改变时处理表单项
watch(currentFormRibbon, formatFormOptions, { deep: true })

//是否是图片类型，用于区分图片和字体图标
const iconType = (file?: string) => {
  if (!file) return ''
  const fileType = file.split('.').pop()
  return config.ALLOW_IMAGE_TYPE.includes(fileType || '') ? 'image' : 'font'
}

//将表单格式转换成标准格式
const formatRibbonConfig = (): IRibbonItem => {
  const ribbon: IRibbonFormItem = JSON.parse(
    JSON.stringify(currentFormRibbon.value)
  )
  const ribbonRes = {} as IRibbonItem
  const ribbonDetail = pageList.value?.find((item) => item.id === ribbon.ribbon)
  if (ribbon.ribbon === 'applet') {
    ribbonRes.ribbon = {
      type: 'applet',
      appletName: ribbon.appletName,
      appId: ribbon.appId
    }
  } else if (ribbon.ribbon === 'search') {
    let searchPlaceholderValue = ribbon.searchPlaceholderValue
    if (typeof searchPlaceholderValue === 'string' && searchPlaceholderValue) {
      const separator = searchPlaceholderValue.includes(',') ? ',' : '，'
      searchPlaceholderValue = searchPlaceholderValue
        .split(separator)
        .filter((item) => item)
    }

    ribbonRes.ribbon = {
      type: 'search',
      searchPlaceholderValue: searchPlaceholderValue,
      searchRadius: ribbon.searchRadius
    }
  } else if (ribbonDetail) {
    ribbonRes.ribbon = { ...ribbonDetail, type: 'page' }
    if (ribbon.webviewUrl) {
      ribbonRes.ribbon.webviewUrl = ribbon.webviewUrl
    }
  }
  ribbon.icon = Array.isArray(ribbon.icon) ? ribbon.icon[0].path : ribbon.icon
  ribbonRes.iconType = iconType(ribbon.icon)
  delete ribbon.appletName
  delete ribbon.appId
  delete ribbon.webviewUrl
  delete ribbon.searchRadius
  delete ribbon.searchPlaceholderValue
  ribbonRes.id = ribbonData.value.length + 1
  Object.assign(ribbon, ribbonRes)
  return ribbon as unknown as IRibbonItem
}

//添加一个新的功能
const submitRibbon = () => {
  showRibbon.value = false
  if (currentFormRibbon.value) {
    const ribbon = formatRibbonConfig()
    if (currentRibbonIndex.value || currentRibbonIndex.value === 0) {
      ribbonData.value[currentRibbonIndex.value] = ribbon
    } else {
      ribbonData.value.push(ribbon)
    }
  }
}

//删除一个功能
const deleteRibbon = (index: number) => {
  ribbonData.value.splice(index, 1)
}

//拖拽结束
const draggableEnd = () => {
  emits('update:modelValue', ribbonData.value)
}
</script>

<template>
  <div>
    <div class="mb_2">
      <el-alert
        class="mb_2"
        title="支持拖动排序"
        type="info"
        center
        show-icon
      />
    </div>
    <draggable
      class="flex_col main_around main_center"
      v-model="ribbonData"
      group="ribbon"
      item-key="id"
      @end="draggableEnd"
    >
      <template #item="{ element, index }">
        <div class="w_100 flex center mb_2">
          <el-input
            readonly
            :placeholder="placeholder"
            :model-value="element?.ribbonName"
          >
            <template #append>
              <el-button @click="showRibbonDrawer(index)" class="cursor_pointer"
                >配置</el-button
              >
            </template>
          </el-input>
          <el-popconfirm
            width="220"
            confirm-button-text="删除"
            :title="`确定删除【${element.ribbonName}】？`"
            @confirm="deleteRibbon(index)"
          >
            <template #reference>
              <svg-icon
                class="ml_2"
                icon-name="delete"
                color="#f56c6c"
              ></svg-icon>
            </template>
          </el-popconfirm>
        </div>
      </template>
    </draggable>

    <div class="flex center">
      <el-button
        v-if="ribbonData.length < maxRibbon"
        @click="showRibbonDrawer(ribbonData.length)"
        type="primary"
        >+添加功能
      </el-button>
    </div>

    <el-drawer
      :model-value="showRibbon"
      title="功能区配置"
      width="38%"
      append-to-body
      @closed="closed"
    >
      <basic-form
        v-if="showRibbon"
        v-model="currentFormRibbon"
        :label-width="120"
        :options="formOptions"
        @submit="submitRibbon"
      ></basic-form>
    </el-drawer>
  </div>
</template>
