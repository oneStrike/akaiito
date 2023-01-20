<script setup lang="ts">
import { useDiyStore } from '@/stores'
import type { IBasicForm } from '@/typings/components/basicForm'
import { requiredRule } from '@/hooks/useValidator'
import { findFormItem } from '@/utils'

const diyStore = useDiyStore()

const formOptions: IBasicForm['options'] = reactive([
  {
    field: 'searchBoxColor',
    component: 'ColorPicker',
    bind: {
      label: '搜索框颜色'
    },
    componentProps: {}
  },
  {
    field: 'searchBoxRadius',
    component: 'InputNumber',
    bind: {
      required: true,
      label: '圆角'
    },
    componentProps: {
      bind: {
        placeholder: '请输入搜索框圆角',
        min: 4,
        max: 50,
        controlsPosition: 'right'
      }
    }
  },
  {
    field: 'searchBoxPlaceholder',
    component: 'Input',
    bind: {
      label: '提示文字'
    },
    componentProps: {
      bind: {
        type: 'textarea',
        placeholder: '若置空则自动展示前5条热门搜索\n多条提示语请使用，分割。',
        autosize: { minRows: 4 }
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
        placeholder: '请选择文字颜色'
      }
    }
  },
  {
    field: 'iconPosition',
    component: 'Radio',
    bind: {
      label: '图标位置'
    },
    componentProps: {
      options: [
        {
          label: '左侧',
          value: 'left'
        },
        {
          label: '右侧',
          value: 'right'
        }
      ]
    }
  },
  {
    field: 'icon',
    component: 'Upload',
    bind: {
      label: '图标',
      required: true,
      rules: requiredRule('图标')
    },
    componentProps: {
      bind: {}
    }
  },
  {
    field: 'iconColor',
    component: 'ColorPicker',
    bind: {
      label: '图标颜色'
    },
    componentProps: {
      bind: {
        placeholder: '请输入图标颜色'
      }
    }
  }
])

watch(
  () => diyStore.currentModule?.attr,
  (val) => {
    console.log('🚀 ~ file:AttrSearch method: line:107 -----', val)
    if (!val) return
    if (val.icon && Array.isArray(val.icon) && val.icon[0]) {
      const icon = val.icon[0]
      const iconColor = findFormItem(formOptions, 'iconColor')
      iconColor.hide = icon.type === 'icon'
    }
  },
  { deep: true }
)
</script>

<template>
  <div>
    <basic-form
      v-if="diyStore.currentModule"
      v-model="diyStore.currentModule.attr"
      :label-width="120"
      :show-btn="false"
      :options="formOptions"
    ></basic-form>
  </div>
</template>
