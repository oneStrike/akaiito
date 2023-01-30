<script setup lang="ts">
import draggable from 'vuedraggable'
import type { AdminGetClientPageRes } from '~@/apiTypes/clientManage'
import { clientPageApi } from '@/api/client/client'
import { findFormItem } from '@/utils'
import { options } from '@/views/App/Devise/PageDiy/modules/components/shared'
import config from '@/config'
import type { IDiyPageCommon, TDiyModuleItem } from '~@/diyPageModule'
import { DiyRibbonEnum } from '~@/enum/diyModuleEnum'
import * as _ from 'lodash'
import { defaultAttrSearch } from '@/views/App/Devise/PageDiy/attr/default'

interface IRibbonOp {
  placeholder?: string
  searchBox?: boolean
  maxRibbon?: number
  modelValue: TDiyModuleItem[] | []
}

const props = withDefaults(defineProps<IRibbonOp>(), {
  placeholder: '请配置功能区',
  searchBox: false,
  maxRibbon: 4,
  modelValue: () => []
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: TDiyModuleItem[]): void
  (event: 'complete', data: TDiyModuleItem[]): void
}>()

let formOptions = options()

const ribbonData = ref<TDiyModuleItem[]>(props.modelValue || [])
const currentFormRibbon = ref<TDiyModuleItem>()
const currentRibbonIndex = ref<number>()
const showRibbon = ref(false)

const defaultRibbon: Partial<IDiyPageCommon> = {
  id: ribbonData.value.length + 1,
  name: '',
  size: 30,
  icon: '',
  iconColor: '#333333'
}

//展示编辑drawer
const showRibbonDrawer = (index?: number) => {
  currentRibbonIndex.value = index
  currentFormRibbon.value =
    ribbonData.value[index || 0] || _.cloneDeep(defaultRibbon)
  formOptions = options()
  getClientPage()
  formatFormOptions()
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
      value: DiyRibbonEnum.APPLET
    },
    {
      label: '搜索框',
      value: DiyRibbonEnum.SEARCH
    }
  ]
  if (!props.searchBox) otherRibbon.pop()
  selectPageListData.unshift(...otherRibbon)
  findFormItem(formOptions, 'type').componentProps.options = selectPageListData
}

const closed = () => {
  showRibbon.value = false
}

//显示或者隐藏搜索框的配置项
const switchSearchOptions = (flag: boolean) => {
  const options = [
    'searchBoxColor',
    'searchBorderColor',
    'searchBoxRadius',
    'searchPlaceholder',
    'searchPlaceholderColor',
    'searchIconPosition',
    'searchIcon',
    'searchIconColor'
  ]

  options.forEach((item) => {
    findFormItem(formOptions, item).hide = flag
  })
  // if (flag) {
  //   currentFormRibbon.value = Object.assign(
  //     defaultAttrSearch(),
  //     currentFormRibbon.value
  //   )
  // }
}

//显示或者隐藏小程序的配置项
const switchAppletOptions = (flag: boolean) => {
  const options = ['appletName', 'appId']
  options.forEach((item) => {
    findFormItem(formOptions, item).hide = flag
  })
}
//显示或者隐藏webview的配置项
const switchWebviewOptions = (flag: boolean) => {
  const options = ['webviewUrl']
  options.forEach((item) => {
    findFormItem(formOptions, item).hide = flag
  })
}
//处理表单编辑时字体图标的配置
const handlerFontIconOptions = (type: string) => {
  const icon = findFormItem(formOptions, 'icon')
  const iconColor = findFormItem(formOptions, 'iconColor')
  const size = findFormItem(formOptions, 'size')
  iconColor.hide = !type || config.ALLOW_IMAGE_TYPE.includes(type || '')
  if (
    currentFormRibbon.value?.icon &&
    !iconColor.hide &&
    icon.componentProps.bind
  ) {
    size.componentProps.bind!.max = 38
    size.componentProps.bind!.min = 20
    icon.componentProps.bind.iconStyle = {
      [type]: {
        color: currentFormRibbon.value.iconColor || '#333333',
        size: currentFormRibbon.value.size
      }
    }
  }
}

//处理不同功能区的表单项
const formatFormOptions = () => {
  const ribbonType = currentFormRibbon.value?.type
  const formIcon = currentFormRibbon.value?.icon
  const formAutoWidth = currentFormRibbon.value?.autoWidth
  const ribbonDetail = pageList.value?.find(
    (item) => item.id === currentFormRibbon.value?.id
  )
  const icon = findFormItem(formOptions, 'icon')
  const autoWidth = findFormItem(formOptions, 'autoWidth')
  const size = findFormItem(formOptions, 'size')
  icon.hide = false
  autoWidth.hide = true
  size.componentProps.bind!.max = 60
  switchWebviewOptions(true)
  switchAppletOptions(true)
  switchSearchOptions(true)
  if (ribbonType) {
    if (ribbonType === 'applet') {
      switchAppletOptions(false)
    } else if (ribbonType === 'search') {
      icon.hide = true
      autoWidth.hide = false
      switchSearchOptions(false)
      size.componentProps.bind!.max = 260
    } else if (ribbonDetail && ribbonDetail.pageName === 'H5') {
      switchWebviewOptions(false)
    }
  }
  //字体图标样式
  let iconType
  if (Array.isArray(formIcon) && formIcon.length) {
    iconType = formIcon[0].filename?.split('.').pop()
  } else if (formIcon) {
    iconType = formIcon
  }
  handlerFontIconOptions(iconType)

  //自适应宽度
  size.componentProps.bind!.disabled = formAutoWidth
}

//currentRibbon改变时处理表单项
watch(currentFormRibbon, formatFormOptions, { deep: true })

//添加一个新的功能
const submitRibbon = () => {
  showRibbon.value = false
  if (currentFormRibbon.value) {
    if (!currentFormRibbon.value.type) {
      const ribbonDetail = pageList.value?.find(
        (item) => item.id === currentFormRibbon.value?.id
      )
      Object.assign(currentFormRibbon.value || {}, ribbonDetail)
    }

    if (typeof currentFormRibbon.value.type === 'number')
      currentFormRibbon.value.type = DiyRibbonEnum.PAGE
    if (Array.isArray(currentFormRibbon.value.icon)) {
      const iconConfig = currentFormRibbon.value.icon[0]
      // currentFormRibbon.value.icon = iconConfig.filename
      currentFormRibbon.value.iconType =
        iconConfig.mimeType === 'icon' ? 'font' : 'image'
    }
    if (currentRibbonIndex.value || currentRibbonIndex.value === 0) {
      ribbonData.value[currentRibbonIndex.value] = currentFormRibbon.value
    } else {
      ribbonData.value.push(currentFormRibbon.value)
    }
    emits('update:modelValue', ribbonData.value)
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
      animation="300"
      @end="draggableEnd"
    >
      <template #item="{ element, index }">
        <div class="w_100 flex center mb_2">
          <el-input
            readonly
            :placeholder="placeholder"
            :model-value="element?.name"
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
            :title="`确定删除【${element.name}】？`"
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
