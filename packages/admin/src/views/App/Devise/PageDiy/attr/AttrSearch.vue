<script setup lang="ts">
import { useDiyStore } from '@/stores'
import type { IBasicForm } from '@/typings/components/basicForm'

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
    field: 'background',
    component: 'ColorPicker',
    bind: {
      label: '背景颜色'
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
        placeholder: '请输入提示文字',
        maxLength: 15
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
  }
])
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
