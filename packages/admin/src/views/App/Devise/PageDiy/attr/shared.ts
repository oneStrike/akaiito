import type { IDivider } from '@/typings/components/diyPage'
//通用配置
import type { IBasicForm } from '@/typings/components/basicForm'
import type { IBasicDiy } from '@/typings/components/diyPage'

//通用配置
export const basicConfig = (): IBasicDiy => {
  return {
    borderRadius: 'close',
    aroundRadius: 8,
    topRadius: 8,
    bottomRadius: 8,
    bothSideMargin: 16,
    backgroundType: 'color',
    backgroundColor: '#ffffff',
    backgroundImage: '',
    divider: true
  }
}

//通用间距配置
export const basicDivider = (): IDivider => {
  return {
    backgroundColor: '#f5f5f5',
    bothSideMargin: 0,
    height: 16
  }
}

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
