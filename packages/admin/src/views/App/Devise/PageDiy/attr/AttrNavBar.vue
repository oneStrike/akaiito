<script setup lang="ts">
import type { IBasicForm } from '@/typings/components/basicForm'
import Ribbon from '@/views/App/Devise/PageDiy/modules/components/Ribbon.vue'
import { requiredRule } from '@/hooks/useValidator'
import { useDiyStore } from '@/stores'
import { findFormItem } from '@/utils'
const formOptions: IBasicForm['options'] = reactive([
  {
    field: 'navBarHeight',
    component: 'InputNumber',
    bind: {
      required: true,
      label: '导航栏高度',
      rules: requiredRule('导航栏高度')
    },
    componentProps: {
      bind: {
        placeholder: '请输入导航栏高度',
        min: 38,
        max: 68,
        controlsPosition: 'right'
      }
    }
  },
  {
    field: 'text',
    component: 'Input',
    bind: {
      label: '导航栏文字',
      required: true,
      rules: requiredRule('导航栏文字')
    },
    componentProps: {
      bind: {
        placeholder: '请输入导航栏文字',
        disabled: false
      }
    }
  },
  {
    field: 'textColor',
    component: 'ColorPicker',
    bind: {
      label: '文字颜色'
    },
    componentProps: {
      bind: {
        disabled: false
      }
    }
  },

  {
    field: 'ribbon',
    component: 'Switch',
    bind: {
      label: '功能区'
    },
    componentProps: {
      tips: '将覆盖默认样式，如果需要小程序，请注意胶囊按钮位置'
    }
  }
])
const diyStore = useDiyStore()

const { currentModule } = storeToRefs(diyStore)
const customRibbonShow = ref(false)
watch(
  currentModule,
  (val) => {
    if (val) {
      const text = findFormItem(formOptions, 'text')
      const textColor = findFormItem(formOptions, 'textColor')
      const attr = val.attr
      //自定义功能区
      text.componentProps.bind!.disabled = attr.ribbon
      textColor.componentProps.bind!.disabled = attr.ribbon
      customRibbonShow.value = attr.ribbon
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <basic-form
    v-if="currentModule"
    v-model="currentModule.attr"
    :label-width="120"
    :show-btn="false"
    :options="formOptions"
  >
  </basic-form>
  <Ribbon
    v-if="customRibbonShow && currentModule"
    v-model="currentModule.attr.ribbonConfig"
    :search-box="true"
    :max-ribbon="4"
  ></Ribbon>
</template>

<style scoped lang="scss"></style>
