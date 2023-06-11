<script setup lang="ts">
import {
  createSocialCircleClassify,
  deleteSocialCircleClassify,
  getSocialCircleClassifyList,
  getSocialCirclePage,
  updateSocialCircleClassify
} from '@/api/socialCircle'
import BasicTree from '@/components/basic/BasicTree.vue'
import type { BasicTableColumn } from '@/typings/components/basic/basicTable'
import type { JoinLoading } from '@/typings/shared'
import type {
  AdminCreateSocialCircleClassifyReq,
  AdminGetSocialCircleClassifyListRes,
  AdminGetSocialCirclePageRes
} from '~@/apiTypes/socialCircle'
import { useSpace } from '@/hook/useTsx'
import { useMessage } from '@/hook/naviaDiscreteApi'
import type { BasicFormOptions } from '@/typings/components/basic/basicForm'
import { useFormAssist } from '@/hook/useFormAssist'

type SocialCircleItem = JoinLoading<AdminGetSocialCirclePageRes['list'][number]>
type SocialCircleClassifyItem = AdminGetSocialCircleClassifyListRes[number]
const socialCieCleClassifyList = ref<AdminGetSocialCircleClassifyListRes>()

const formAssist = useFormAssist<Partial<SocialCircleClassifyItem>>()

//获取圈子分类
const getTreeData = async () => {
  socialCieCleClassifyList.value = await getSocialCircleClassifyList()
}

//圈子列表请求参数
const requestTableParams = {
  classifyId: ''
}
getTreeData()

//创建or编辑圈子分类
const createClassify = async (val: AdminCreateSocialCircleClassifyReq) => {
  try {
    formAssist.loading = true

    if (formAssist.edit) {
      await updateSocialCircleClassify({ ...val, id: formAssist.editData?.id! })
    } else {
      await createSocialCircleClassify(val)
    }
    await getTreeData()
    useMessage.success(formAssist.edit ? HintEnum.UPD_SUC : HintEnum.ADD_SUC)
    formAssist.clearStatus()
  } catch (error) {
    formAssist.loading = false
  }
}

//删除圈子分类
const deleteClassify = async (id: number) => {
  formAssist.loading = true
  await deleteSocialCircleClassify({ id })
  await getTreeData()
  useMessage.success(HintEnum.DEL_SUC)
  formAssist.loading = false
}

const tableColumns: BasicTableColumn<SocialCircleItem> = [
  {
    key: 'name',
    title: '名称',
    render: (row) =>
      useButton(row.name, {
        text: true,
        type: 'primary'
      })
  }
]
const tableFilterOptions: BasicFormOptions[] = [
  {
    component: 'Select',
    bind: {
      label: '状态',
      path: 'status',
      width: 180
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '审核中', value: 0 },
        { label: '正常', value: 1 },
        { label: '审核失败', value: 2 },
        { label: '封禁', value: 3 }
      ]
    }
  },
  {
    component: 'Select',
    bind: {
      label: '首页展示',
      path: 'guide',
      width: 180
    },
    componentProps: {
      bind: {
        placeholder: '状态'
      },
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    }
  },
  {
    component: 'Input',
    bind: {
      label: '名称',
      path: 'name',
      width: 160
    },
    componentProps: {
      bind: {
        placeholder: '名称'
      }
    }
  }
]

const classifyFormOptions: BasicFormOptions[] = [
  {
    component: 'Input',
    bind: {
      label: '分类',
      path: 'classifyName',
      rule: useValidate.required({ message: '分类' })
    },
    componentProps: {
      bind: {
        placeholder: '请输入分类'
      }
    }
  }
]

//分类操作按钮
const renderSuffix = ({ option }: { option: SocialCircleItem }) => {
  return useSpace([
    useSvgIcon({
      iconName: 'edit',
      size: 16,
      onClick: () => {
        formAssist.showModal = true
        formAssist.edit = true
        formAssist.editData = option
        formAssist.formValue = {
          classifyName: option.classifyName
        }
      }
    }),
    usePopConfirm({
      source: option,
      text: '删除',
      tipField: 'classifyName',
      confirm: () => deleteClassify(option.id),
      props: {
        positiveButtonProps: {
          loading: formAssist.loading
        }
      },
      trigger: () =>
        useSvgIcon({
          iconName: 'delete',
          size: 16,
          type: 'error'
        })
    })
  ])
}
</script>
<template>
  <div class="h_100">
    <n-grid :cols="3" :x-gap="12" class="h_100">
      <n-grid-item class="bg">
        <n-card class="h_100">
          <basic-tree
            :tree-data="socialCieCleClassifyList"
            label-field="classifyName"
            key-field="id"
            :render-suffix="renderSuffix"
          >
            <template #search-after>
              <svg-icon
                icon-name="plusCircle"
                @click="formAssist.showModal = true"
              ></svg-icon>
            </template>
          </basic-tree>
        </n-card>
      </n-grid-item>
      <n-grid-item :span="2">
        <n-card class="h_100">
          <basic-table
            ref="tableRef"
            :columns="tableColumns"
            :requestApi="getSocialCirclePage"
            :list-params="requestTableParams"
            :filter-options="tableFilterOptions"
          ></basic-table>
        </n-card>
      </n-grid-item>
    </n-grid>

    <form-modal
      title="编辑分类"
      v-model:show="formAssist.showModal"
      :loading="formAssist.loading"
      :height="30"
      v-model="formAssist.formValue"
      :options="classifyFormOptions"
      @close="formAssist.formValue = {}"
      @confirm="createClassify"
    />
  </div>
</template>

<style scoped lang="scss"></style>
