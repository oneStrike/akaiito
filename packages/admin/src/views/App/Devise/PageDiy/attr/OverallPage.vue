<script setup lang="ts">
import { useDiyStore } from '@/stores'
import type { IBasicForm } from '@/typings/components/basicForm'
import { requiredRule } from '@/hooks/useValidator'
import { findFormItem } from '@/utils'
const diyStore = useDiyStore()

const formOptions: IBasicForm['options'] = reactive([
  {
    field: 'pageName',
    component: 'Input',
    bind: {
      required: true,
      label: '页面名称',
      rules: requiredRule('页面名称')
    },
    componentProps: {
      bind: {
        placeholder: '请输入页面名称'
      }
    }
  },
  {
    field: 'adaptiveStatusBar',
    component: 'Switch',
    bind: {
      required: true,
      label: '自适应高度'
    },
    componentProps: {
      tips: '开启后会自适应手机状态栏高度，除非有特殊需求，否则不建议关闭！'
    }
  },
  {
    field: 'backgroundStyle',
    component: 'Radio',
    bind: {
      label: '背景样式'
    },
    componentProps: {
      options: [
        { label: '背景图', value: 'image' },
        { label: '背景色', value: 'color' }
      ]
    }
  },
  {
    field: 'backgroundImage',
    component: 'Upload',
    bind: {
      label: '背景图片'
    },
    componentProps: {}
  },
  {
    field: 'backgroundColor',
    component: 'ColorPicker',
    bind: {
      label: '背景颜色'
    },
    componentProps: {}
  }
])

watch(
  () => diyStore.overallPage,
  (val) => {
    const backgroundImage = findFormItem(formOptions, 'backgroundImage')
    const backgroundColor = findFormItem(formOptions, 'backgroundColor')
    if (val.backgroundStyle === 'color') {
      backgroundImage.hide = true
      backgroundColor.hide = false
    } else if (val.backgroundStyle === 'image') {
      backgroundImage.hide = false
      backgroundColor.hide = true
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <div>
    <basic-form
      v-model="diyStore.overallPage"
      :label-width="130"
      :show-btn="false"
      :options="formOptions"
    ></basic-form>
  </div>
</template>
