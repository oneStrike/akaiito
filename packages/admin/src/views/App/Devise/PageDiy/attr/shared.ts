//通用配置
import type { IBasicForm } from '@/typings/components/basicForm'
import { requiredRule } from '@/hooks/useValidator'

//通用配置表单项
export const basicOptions = (): IBasicForm['options'] => {
  return reactive([
    {
      field: 'bothSideMargin',
      component: 'InputNumber',
      bind: {
        label: '模块边距'
      },
      componentProps: {
        tips: '只会影响左右边距',
        bind: {
          placeholder: '请输入模块左右边距',
          min: 0,
          max: 32,
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'borderRadius',
      component: 'Radio',
      bind: {
        label: '圆角'
      },
      componentProps: {
        options: [
          {
            label: '关闭',
            value: 'close'
          },
          {
            label: '四周',
            value: 'around'
          },
          {
            label: '头部',
            value: 'top'
          },
          {
            label: '底部',
            value: 'bottom'
          }
        ]
      }
    },
    {
      field: 'aroundRadius',
      hide: true,
      component: 'InputNumber',
      bind: {
        label: '四周'
      },
      componentProps: {
        bind: {
          min: 0,
          max: 99,
          placeholder: '请输入四周圆角值',
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'topRadius',
      component: 'InputNumber',
      hide: true,
      bind: {
        label: '顶部'
      },
      componentProps: {
        bind: {
          min: 0,
          max: 99,
          placeholder: '请输入顶部圆角值',
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'bottomRadius',
      component: 'InputNumber',
      hide: true,
      bind: {
        label: '底部'
      },
      componentProps: {
        bind: {
          min: 0,
          max: 99,
          placeholder: '请输入底部圆角值',
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'backgroundType',
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
      hide: true,
      bind: {
        label: '背景图片'
      },
      componentProps: {}
    },
    {
      field: 'backgroundColor',
      component: 'ColorPicker',
      hide: false,
      bind: {
        label: '背景颜色'
      },
      componentProps: {
        bind: {
          showAlpha: true
        }
      }
    },
    {
      field: 'divider',
      component: 'Switch',
      bind: {
        label: '模块间距'
      },
      componentProps: {}
    }
  ])
}

//通用配置表单项
export const basicDividerOptions = (): IBasicForm['options'] => {
  return reactive([
    {
      field: 'bothSideMargin',
      component: 'InputNumber',
      bind: {
        label: '边距'
      },
      componentProps: {
        bind: {
          placeholder: '请输入边距',
          min: 0,
          max: 32,
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'height',
      component: 'InputNumber',
      bind: {
        label: '高度'
      },
      componentProps: {
        bind: {
          placeholder: '请输入高度',
          min: 0,
          max: 32,
          controlsPosition: 'right'
        }
      }
    },
    {
      field: 'backgroundColor',
      component: 'ColorPicker',
      bind: {
        label: '背景色'
      },
      componentProps: {
        bind: {
          placeholder: '请选择背景颜色',
          showAlpha: true
        }
      }
    }
  ])
}

//导航栏
export const navBarForm = (): IBasicForm['options'] => {
  return reactive([
    {
      field: 'height',
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
      field: 'enableRibbon',
      component: 'Switch',
      bind: {
        label: '功能区'
      },
      componentProps: {
        tips: '将覆盖默认样式，如果需要小程序，请注意胶囊按钮位置'
      }
    }
  ])
}

//搜索
export const searchForm = (): IBasicForm['options'] => {
  return reactive([
    {
      field: 'searchBoxColor',
      component: 'ColorPicker',
      bind: {
        label: '搜索框颜色'
      },
      componentProps: {}
    },
    {
      field: 'searchBorderColor',
      component: 'ColorPicker',
      bind: {
        label: '边框框颜色'
      },
      componentProps: {}
    },
    {
      field: 'searchBoxHeight',
      component: 'InputNumber',
      bind: {
        required: true,
        label: '高度'
      },
      componentProps: {
        bind: {
          placeholder: '请输入搜索框高度',
          min: 20,
          max: 100,
          controlsPosition: 'right'
        }
      }
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
      field: 'searchPlaceholder',
      component: 'Input',
      bind: {
        label: '提示文字'
      },
      componentProps: {
        bind: {
          type: 'textarea',
          placeholder:
            '若置空则自动展示前5条热门搜索\n多条提示语请使用，分割。',
          autosize: { minRows: 4 }
        }
      }
    },
    {
      field: 'searchPlaceholderColor',
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
      field: 'searchIconPosition',
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
      field: 'searchIcon',
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
      field: 'searchIconColor',
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
}
