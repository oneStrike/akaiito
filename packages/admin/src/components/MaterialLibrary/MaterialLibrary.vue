<script setup lang="ts">
import {
  createMaterialApi,
  createMaterialLibraryApi,
  deleteMaterialApi,
  deleteMaterialLibraryApi,
  getMaterialApi,
  getMaterialLibraryApi,
  modifyMaterialLibraryApi
} from '@/api/materialLibrary/materialLibrary'

import type {
  AdminGetMaterialGroupRes,
  AdminGetMaterialRes
} from '~@/apiTypes/materialLibrary'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import { useAlert } from '@/hooks/useAlert'
import { iconfonts } from '@/components/MaterialLibrary/iconfont'
type TGroup = AdminGetMaterialGroupRes['list'][number]

interface IMaterialLibrary {
  visible: boolean
  limit?: number
  onlyFontIcon?: boolean
  defaultPath?: (string | undefined)[]
}

type TMaterialItem = AdminGetMaterialRes['list'][number]

type TSelectItem = AdminGetMaterialRes['list']

const props = withDefaults(defineProps<IMaterialLibrary>(), {
  visible: false,
  onlyFontIcon: false,
  limit: 1
})
const emits = defineEmits<{
  (event: 'selection', data: any): void
  (event: 'closed'): void
}>()
const allGroupId = 20221227
const iconfontGroupId = 20221228
const otherGroup = [
  {
    id: allGroupId,
    groupName: '全部',
    sort: 0,
    createdAt: '',
    updatedAt: ''
  },
  {
    id: iconfontGroupId,
    groupName: '字体图标',
    sort: 0,
    createdAt: '',
    updatedAt: ''
  }
]
const vLoading = ref(false)
const currentGroup = ref<TGroup | null>()

//获取素材分组列表
const materialLibraryGroup = ref()
const getMaterialLibraryGroup = async () => {
  if (props.onlyFontIcon) {
    materialLibraryGroup.value = [otherGroup[1]]
    await selectionGroup(otherGroup[1])
    return
  }
  const groups = (await getMaterialLibraryApi()).list
  groups.unshift(...otherGroup)
  materialLibraryGroup.value = groups
}

//搜索
const searchValue = ref('')
const searchStart = async () => {
  await getMaterial()
}

// 获取素材
const listParams = reactive({
  pageSize: 21,
  pageIndex: 1
})

const material = ref<AdminGetMaterialRes>()
const getMaterial = async () => {
  if (currentGroup.value?.id === iconfontGroupId || props.onlyFontIcon) {
    return
  }
  vLoading.value = true
  const groupId =
    currentGroup.value?.id === allGroupId
      ? ''
      : currentGroup.value?.id.toString()
  material.value = await getMaterialApi({
    groupId,
    materialName: searchValue.value,
    pageSize: listParams.pageSize.toString(),
    pageIndex: (listParams.pageIndex - 1).toString()
  })
  vLoading.value = false
}

watch(listParams, getMaterial, { deep: true })

//选择分组，获取对应而分组的数据
const selectionGroup = async (val: TGroup) => {
  currentGroup.value = val
  await getMaterial()
}

//添加分组弹窗配置
const modalInputShow = ref(false)
const modalInputAttr = {
  placeholder: '请输入分组名称',
  maxlength: 11,
  showWordLimit: true
}

//编辑或添加分组
const operateGroup = async (groupName: string | number) => {
  groupName = groupName.toString()
  if (!groupName) {
    modalInputShow.value = false
    currentGroup.value = null
    return
  }
  if (currentGroup.value && currentGroup.value.id !== allGroupId) {
    const { id } = currentGroup.value
    await modifyMaterialLibraryApi({ id, groupName })
  } else {
    await createMaterialLibraryApi({ groupName })
  }
  await getMaterialLibraryGroup()
  modalInputShow.value = false
  const tips = currentGroup.value ? Hint.UPD_SUC : Hint.ADD_SUC
  useMessage('success', tips)
  currentGroup.value = null
}

//展示编辑分组弹窗
const isEditGroup = ref(false)
const editGroup = (group: TGroup) => {
  currentGroup.value = group
  isEditGroup.value = true
  modalInputShow.value = true
}
//删除分组
const deleteGroup = async (group: TGroup) => {
  await deleteMaterialLibraryApi({ id: group.id })
  await getMaterialLibraryGroup()
  if (group.id === currentGroup.value?.id) {
    await selectionGroup(otherGroup[0])
  }
  useMessage('success', Hint.DEL_SUC)
}

//上传素材
const uploadedMaterial = ref([])
watch(
  uploadedMaterial,
  async (val) => {
    const groupId = currentGroup.value?.id
    if (groupId) {
      uploadedMaterial.value = val
      const params = val.map((item: CommonUploadRes[number]) => {
        return {
          path: item.path,
          materialName: item.filename,
          materialType: 'image'
        }
      })
      await createMaterialApi({
        groupId,
        material: params
      })
      await getMaterial()
    }
  },
  { deep: true }
)

//删除素材
const deleteMaterial = (val: TMaterialItem) => {
  useAlert({
    content: `确定删除${val.materialName}？`,
    confirm: async () => {
      await deleteMaterialApi({ id: Number(val.id) })
      await getMaterial()
      useMessage('success', Hint.DEL_SUC)
    }
  })
}

const selectionList = ref<TSelectItem>([])

const endowSelectionList = async () => {
  const defaultPath = props.defaultPath
  if (!material.value) {
    await Promise.all([getMaterialLibraryGroup(), getMaterial()])
  }
  if (material.value && defaultPath) {
    material.value.list.forEach((item) => {
      if (defaultPath.includes(item.path)) {
        selectionList.value.push(item)
      }
    })
  }
}

watch(
  () => props.visible,
  (val) => {
    selectionList.value = []
    if (val) endowSelectionList()
  },
  { immediate: true }
)

//选定图片，发射事件
const selectItem = (val: TMaterialItem | string) => {
  let isExist: number | null = null
  if (typeof val === 'string') {
    isExist = selectionList.value.findIndex((item) => item.path === val)
  } else {
    isExist = selectionList.value.findIndex(
      (item: TMaterialItem) => item.id === val.id
    )
  }

  if (props.limit === 1) {
    selectionList.value = []
  }
  if (selectionList.value.length >= props.limit && isExist === -1) {
    useMessage('error', '超出最大选择数')
    return
  }

  if (isExist === -1) {
    let pushValue: TSelectItem[number] | null
    if (typeof val === 'string') {
      pushValue = {
        id: selectionList.value.length,
        materialName: val,
        materialType: 'icon',
        groupId: iconfontGroupId,
        path: val
      }
    } else {
      pushValue = val
    }
    selectionList.value.push(pushValue)
  } else {
    selectionList.value.splice(isExist, 1)
  }
}
const isSelected = (val: TMaterialItem | string) => {
  const findField = typeof val === 'string' ? 'path' : 'id'
  const findValue = typeof val === 'string' ? val : val[findField]
  return !!selectionList.value.find(
    (item: TMaterialItem) => item[findField] === findValue
  )
}
const selection = () => {
  emits('selection', selectionList.value)
}

const closed = () => {
  emits('closed')
}

//图片预览
const previewImageModal = ref(false)
const previewImageList: string[] = reactive([])
const previewImage = (val: TMaterialItem) => {
  previewImageModal.value = true
  previewImageList.push(val.path)
}
const closePreviewImage = () => {
  previewImageModal.value = false
  previewImageList.splice(0, previewImageList.length)
}
</script>

<template>
  <el-dialog
    :model-value="visible"
    title="素材库"
    width="70%"
    top="4vh"
    :close-on-press-escape="false"
    @closed="closed"
  >
    <div class="w_100 content border_solid border_radius_base flex">
      <div
        v-if="!onlyFontIcon"
        class="grouping h_100 border_right pd_12 flex_col border_box"
      >
        <el-button
          type="primary"
          @click=";(modalInputShow = true), (isEditGroup = false)"
          >添加分组</el-button
        >
        <el-tree
          class="mt_12 over_scroll_y flex1"
          :data="materialLibraryGroup"
          highlight-current
          node-key="id"
          :current-node-key="allGroupId"
          :props="{ label: 'groupName' }"
          @node-click="selectionGroup"
        >
          <template #default="{ node, data }">
            <div class="flex main_between center w_100 pr_12">
              <span class="flex1">{{ node.label }}</span>
              <div
                class="flex"
                v-if="data.id !== allGroupId && data.id !== iconfontGroupId"
              >
                <svg-icon
                  @click.stop="editGroup(data)"
                  size="16"
                  icon-name="edit"
                ></svg-icon>
                <el-divider direction="vertical" />
                <el-popconfirm
                  width="220"
                  @confirm.stop="deleteGroup(data)"
                  :title="`确定删除【${data.groupName}】并清空该分组下的所有资源？`"
                >
                  <template #reference>
                    <svg-icon
                      color="#f56c6c"
                      size="16"
                      icon-name="delete"
                    ></svg-icon>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
      <div class="material w_100">
        <div class="flex w_100 pd_12 pb_0">
          <el-input
            class="search_input mr_16"
            v-model="searchValue"
            placeholder="请输入素材名称"
            @keydown.enter="searchStart"
            suffix-icon="Search"
          />
          <div
            class="flex center"
            v-if="
              currentGroup &&
              currentGroup.id !== allGroupId &&
              currentGroup.id !== iconfontGroupId
            "
          >
            <basic-upload
              v-model:upload-file="uploadedMaterial"
              :data="{ fileType: 'material' }"
              :show-file-list="false"
              :upload-method="false"
              :multiple="true"
              list-type="text"
              :limit="8"
              :is-clear="true"
            >
              <svg-icon icon-name="uploading"></svg-icon>
            </basic-upload>
          </div>
        </div>

        <div class="h_85 over_scroll_y pd_12 pr_0">
          <el-space
            wrap
            v-show="
              material?.list?.length && currentGroup?.id !== iconfontGroupId
            "
          >
            <div
              class="material_list flex_col cross_center"
              v-for="item in material?.list"
              :key="item.id"
            >
              <el-card
                :class="isSelected(item) && 'checked'"
                class="cursor_pointer"
                @click="selectItem(item)"
                :body-style="{ padding: '8px', paddingBottom: 0 }"
              >
                <el-tooltip
                  effect="dark"
                  placement="top-start"
                  :show-after="300"
                >
                  <template #content>
                    <span>{{ item.materialName }}</span>
                    <div class="icons w_100 flex center">
                      <svg-icon
                        @click="previewImage(item)"
                        class="mr_16"
                        size="16"
                        icon-name="search2"
                      ></svg-icon>
                      <svg-icon
                        size="16"
                        @click="deleteMaterial(item)"
                        color="#f56c6c"
                        icon-name="delete"
                      ></svg-icon>
                    </div>
                  </template>
                  <div class="content_item flex_col">
                    <el-image
                      class="material_img"
                      fit="cover"
                      :src="$FILE_PATH + item.path"
                    ></el-image>
                    <span class="material_name text_cut">{{
                      item.materialName
                    }}</span>
                  </div>
                </el-tooltip>
              </el-card>
            </div>
          </el-space>
          <el-space wrap v-show="currentGroup?.id === iconfontGroupId">
            <div
              class="material_list flex flex_wrap cross_center"
              v-for="icon in iconfonts"
              :key="icon"
            >
              <el-card
                :body-style="{ padding: '8px', paddingBottom: 0 }"
                :class="isSelected(icon) && 'checked'"
                class="cursor_pointer"
                @click="selectItem(icon)"
              >
                <icon-font :size="30" :type="icon" show-name></icon-font>
              </el-card>
            </div>
          </el-space>

          <el-empty
            v-if="
              !material?.list?.length && currentGroup?.id !== iconfontGroupId
            "
          ></el-empty>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="pos_re">
        <div class="w_100 flex main_end pagination" v-if="material?.total">
          <el-pagination
            small
            background
            :hide-on-single-page="material.total < listParams.pageSize"
            layout="total, jumper, prev, pager, next"
            v-model:page-size="listParams.pageSize"
            :total="material.total"
            v-model:current-page="listParams.pageIndex"
          />
        </div>
        <el-button type="primary" @click="closed"> 取消 </el-button>
        <el-button type="primary" @click="selection"> 选定 </el-button>
      </div>
    </template>
  </el-dialog>
  <modal-input
    :visible="modalInputShow"
    :title="isEditGroup ? '编辑分组' : '添加分组'"
    label="分组名称"
    :input-value="isEditGroup ? currentGroup?.groupName : ''"
    :input-attr="modalInputAttr"
    @closed="modalInputShow = false"
    @complete="operateGroup"
  ></modal-input>

  <modal-image
    :visible="previewImageModal"
    :image-list="previewImageList"
    @close="closePreviewImage"
  ></modal-image>
</template>

<style scoped lang="scss">
@use '@/style/variable.scss' as *;
.content {
  height: 60vh;

  .search_input {
    width: 240px;
  }

  .grouping {
    min-width: 230px;
  }

  .content_item {
    width: 85px;
    height: 107px;

    .material_img {
      width: 80px;
      height: 80px;
    }
  }
}

.material_name {
  max-width: 85px;
}

.pagination {
  height: 32px;
  position: absolute;
  top: -35px;
}

.checked {
  box-shadow: inset 0 0 6px 0 $primary_color_success;
}
</style>
