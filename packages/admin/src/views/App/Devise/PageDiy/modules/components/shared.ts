import type { IBasicForm } from '@/typings/components/basicForm'
import { requiredRule } from '@/hooks/useValidator'

export const options = (): IBasicForm['options'] =>
  reactive([
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
      field: 'size',
      component: 'InputNumber',
      bind: {
        label: '尺寸',
        required: true,
        rules: requiredRule('尺寸')
      },
      componentProps: {
        bind: {
          placeholder: '请输入尺寸',
          min: 30,
          max: 60
        }
      }
    },
    {
      field: 'autoWidth',
      component: 'Switch',
      hide: true,
      bind: {
        label: '自适应宽度'
      },
      componentProps: {
        tips: '开启后，将铺满剩余宽度',
        bind: {}
      }
    },
    {
      field: 'iconColor',
      component: 'ColorPicker',
      hide: true,
      bind: {
        label: '图标颜色'
      },
      componentProps: {
        bind: {
          placeholder: '请输入图标颜色'
        }
      }
    },
    {
      field: 'ribbonName',
      component: 'Input',
      bind: {
        label: '功能名称',
        required: true,
        rules: requiredRule('功能名称')
      },
      componentProps: {
        bind: {
          placeholder: '请输入功能名称'
        }
      }
    },
    {
      field: 'ribbon',
      component: 'Select',
      bind: {
        label: '功能',
        required: true,
        rules: requiredRule('功能')
      },
      componentProps: {
        bind: {
          placeholder: '请选择功能',
          options: []
        }
      }
    },
    {
      field: 'webviewUrl',
      component: 'Input',
      hide: true,
      bind: {
        label: '跳转地址',
        required: true,
        rules: requiredRule('链接地址')
      },
      componentProps: {
        tips: '小程序端请注意配置业务域名',
        bind: {
          placeholder: '请输入链接地址'
        }
      }
    },
    {
      field: 'appletName',
      component: 'Input',
      hide: true,
      bind: {
        label: '小程序名称',
        required: true,
        rules: requiredRule('小程序名称')
      },
      componentProps: {
        tips: '目前仅支持微信小程序',
        bind: {
          placeholder: '请输入小程序名称'
        }
      }
    },
    {
      field: 'appId',
      component: 'Input',
      hide: true,
      bind: {
        label: 'APPID',
        required: true,
        rules: requiredRule('APPID')
      },
      componentProps: {
        bind: {
          placeholder: '请输入小程序APPID'
        }
      }
    },
    {
      field: 'searchRadius',
      component: 'InputNumber',
      hide: true,
      bind: {
        label: '搜索框圆角',
        required: false
      },
      componentProps: {
        bind: {
          placeholder: '请输入搜索框圆角'
        }
      }
    },
    // {
    //   field: 'searchPlaceholderType',
    //   component: 'Radio',
    //   hide: true,
    //   bind: {
    //     label: '提示语类型',
    //     required: true,
    //     rules: requiredRule('提示语')
    //   },
    //   componentProps: {
    //     options: [
    //       { label: '热门搜索', value: 'hotSearch' },
    //       { label: '自定义', value: 'custom' }
    //     ]
    //   }
    // },
    {
      field: 'searchPlaceholderValue',
      component: 'Input',
      hide: true,
      bind: {
        label: '提示语',
        required: false
      },
      componentProps: {
        bind: {
          type: 'textarea',
          placeholder:
            '若置空则自动展示前5条热门搜索\n多条提示语请使用，分割。',
          autosize: { minRows: 4 }
        }
      }
    }
  ])
