<script setup lang="ts">
import config from '@/config'
import type {
  UploadFile,
  UploadFiles,
  UploadProps,
  UploadRawFile,
  UploadUserFile
} from 'element-plus'
import { useUserStore } from '@/stores'
import { useMessage } from '@/hooks/useMessage'
import type { CommonUploadRes } from '@akaiito/typings/src/common/apiTypes/upload'
import { Hint } from '@/utils/hint'
import type { AdminGetMaterialRes } from '~@/apiTypes/materialLibrary'

const { FILE_PATH, UPLOAD_URL } = config
const userStore = useUserStore()
const uploadRef = ref()

const emits = defineEmits<{
  (event: 'success', data: CommonUploadRes): void
  (event: 'error', data: UploadFile): void
  (event: 'update:uploadFile', data: any): void
  (event: 'clear', data: CommonUploadRes): void
}>()

const uploadUrl = ref(UPLOAD_URL)
const headers: Record<string, any> = {
  Authorization: userStore.auth.token
}

interface IUploadProps {
  size?: number
  limit?: UploadProps['limit']
  data?: UploadProps['data']
  multiple?: UploadProps['multiple']
  disabled?: UploadProps['disabled']
  name?: UploadProps['name']
  showFileList?: UploadProps['showFileList']
  accept?: UploadProps['accept']
  onSuccess?: UploadProps['onSuccess']
  beforeUpload?: UploadProps['beforeUpload']
  listType?: UploadProps['listType']
  iconStyle?: Record<string, any>
  isLoading?: boolean
  isClear?: boolean
  uploadFile?: CommonUploadRes | string[] | string
  uploadMethod?: boolean
}

const props = withDefaults(defineProps<IUploadProps>(), {
  limit: 1,
  multiple: false,
  name: 'filename',
  showFileList: true,
  accept: config.ALLOW_IMAGE_TYPE.map((item) => 'image/' + item).join(','),
  size: 20,
  isLoading: false,
  isClear: false,
  listType: 'picture-card',
  uploadFile: () => [],
  iconStyle: () => ({}),
  uploadMethod: true,
  disabled: false
})
const extraData = computed(() => {
  if (props.data && props.data.fileType) return props.data
  return props.data
    ? { ...props.data, fileType: 'shared' }
    : { fileType: 'shared' }
})

const formatUploadFile = (): UploadUserFile[] => {
  if (Array.isArray(props.uploadFile)) {
    return [...props.uploadFile].map(
      (item: string | CommonUploadRes[number], index: number) => {
        return {
          name: index.toString(),
          url:
            typeof item === 'string' ? FILE_PATH + item : FILE_PATH + item.path
        }
      }
    )
  } else if (props.uploadFile) {
    return [{ name: 'tmp', url: FILE_PATH + props.uploadFile }]
  }
  return []
}
const fileList = ref<UploadUserFile[]>([])

const uploadBtn = ref('none')
watch(
  () => props.uploadFile,
  (val) => {
    uploadBtn.value = val.length >= props.limit ? 'none' : 'inline-flex'
    fileList.value = formatUploadFile()
  },
  { immediate: true, deep: true }
)

//格式化素材库数据
const materialExitsList = computed(() => {
  return fileList.value.map((item) => {
    const response = item.response as { data: CommonUploadRes }
    if (response && Array.isArray(response.data)) {
      return response?.data[0].path
    }
  })
})

const isOverload = ref(0) //超载的文件数
const readyUploadFileCount = ref(0) //单次可上传的文件数
const uploaded = reactive({
  success: 0,
  error: 0
}) //上传完成的文件数

//清空，否则会无法更换上传文件
const clearFiles = async () => {
  if (props.isClear) {
    await nextTick()
    uploadRef.value.clearFiles()
  }
}

onMounted(() => {
  clearFiles()
})

//文件上传前
const loading = ref(props.isLoading ? false : null)
const acceptArr = props.accept.split(',')
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (!acceptArr.includes(rawFile.type)) {
    useMessage('error', '请上传合法文件')
    return false
  } else if (rawFile.size / 1024 / 1024 > props.size) {
    return false
  }
  if (loading !== null) loading.value = true
  return true
}

const formatEmitData = (other: UploadUserFile[] = []) => {
  return fileList.value
    .concat(other)
    .map((item) => {
      const response = item.response as { data: CommonUploadRes }
      return response?.data
    })
    .flat()
}

const onSuccess: UploadProps['onSuccess'] = async (
  response,
  uploadFile: UploadFile
) => {
  if (response.code !== 1) {
    uploaded.error++
  } else {
    uploaded.success++
  }
  uploadBtn.value =
    props.uploadFile.length >= props.limit ? 'none' : 'inline-flex'
  if (readyUploadFileCount.value === uploaded.error + uploaded.success) {
    if (isOverload.value) {
      useMessage('error', '超出最大上传数量，单次最大上传' + props.limit + '张')
    } else if (uploaded.error) {
      useMessage('error', uploaded.error + '张上传失败')
    } else {
      useMessage('success', Hint.UPL_SUC)
    }
    if (!uploaded.error) {
      emits('success', response.data)
      emits('update:uploadFile', formatEmitData())
    } else {
      emits('error', uploadFile)
      uploadRef.value.handleRemove(uploadFile)
    }
    clearUploadRecordCount()
    await clearFiles()
  }
  loading.value = false
}

//清空上传记录次数
const clearUploadRecordCount = () => {
  isOverload.value = 0
  uploaded.success = 0
  uploaded.error = 0
}

//上传状态变化，记录准备上传的总文件数
let timer: number
const onChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (uploadFile.status === 'ready') {
    timer && clearTimeout(timer)
    timer = window.setTimeout(() => {
      readyUploadFileCount.value = uploadFiles.filter(
        (item) => item.status === 'ready'
      ).length
      uploadBtn.value =
        readyUploadFileCount.value + fileList.value.length >= props.limit
          ? 'none'
          : 'inline-flex'
      uploadRef.value.submit()
    })
  }
}

//上传失败
const onError = () => {
  uploaded.error++
}

//图片超过上传限制
const onExceed = (files: File[]) => {
  isOverload.value = files.length - props.limit
  const validFile = files.splice(0, props.limit)
  handleStart(validFile)
  uploadRef.value.submit()
}

//手动选择文件
const handleStart = (rawFiles: UploadRawFile[] | File[]) => {
  rawFiles.forEach((item) => {
    uploadRef.value.handleStart(item)
  })
}

//图片移除
const onRemove = (file: UploadFile) => {
  const fileIndex = fileList.value.findIndex((item) => item.uid === file.uid)
  fileList.value.splice(fileIndex, 1)
  emits('update:uploadFile', formatEmitData())
}

//图片预览
const previewImage = ref(false)
const dialogImageUrl: string[] = reactive([])
const onPreview = (uploadFile: UploadFile) => {
  if (uploadFile?.url) {
    previewImage.value = true
    dialogImageUrl.push(uploadFile.url)
  }
}

//关闭图片预览
const closePreviewImage = () => {
  previewImage.value = false
  dialogImageUrl.splice(0, dialogImageUrl.length)
}

//手动打开文件选择框
const timestampClassName = new Date().valueOf()
const showSelectFile = () => {
  const uploadBtn: HTMLElement | null = document.querySelector(
    '.svg' + timestampClassName
  )
  if (uploadBtn) uploadBtn.click()
}

//打开素材库
const materialShow = ref(false)
const showStockLibrary = () => {
  materialShow.value = true
}

//素材库选择
const materialSelection = (val: AdminGetMaterialRes['list']) => {
  const formatData: UploadUserFile[] = val.map((item) => {
    return {
      name: item.materialName,
      url: config.FILE_PATH + item.path,
      response: {
        data: [
          {
            filename: item.materialName,
            path: item.path,
            mimeType: item.materialType,
            _ext: item.materialType
          }
        ]
      }
    }
  })
  emits('update:uploadFile', formatEmitData(formatData))
  materialShow.value = false
}

//是否是图片类型，用于区分图片和字体图标
const isImage = (file: UploadFile) => {
  const splitArr = file.url?.split('.') || []
  const fileType = 'image/' + splitArr.pop()
  return props.accept.includes(fileType)
}
</script>

<template>
  <el-upload
    class="flex"
    ref="uploadRef"
    v-loading:body="loading"
    v-model:file-list="fileList"
    v-bind="props"
    :auto-upload="false"
    :data="extraData"
    :action="uploadUrl"
    :headers="headers"
    :before-upload="beforeUpload"
    :listType="listType"
    :on-success="onSuccess"
    :on-change="onChange"
    :on-exceed="onExceed"
    :on-error="onError"
  >
    <slot>
      <svg-icon
        :class="'svg' + timestampClassName"
        icon-name="uploading"
      ></svg-icon>
    </slot>
    <template #file="{ file }">
      <div class="w_100 h_100">
        <label class="el-upload-list__item-status-label status_label">
          <svg-icon icon-name="check" size="12" color="#ffffff"></svg-icon>
        </label>
        <div class="el-upload-list__item-actions item-actions">
          <span
            v-if="isImage(file)"
            @click="onPreview(file)"
            class="el-upload-list__item-preview"
          >
            <svg-icon icon-name="search"></svg-icon>
          </span>
          <span @click="onRemove(file)" class="el-icon el-icon--zoom-in">
            <svg-icon icon-name="delete"></svg-icon>
          </span>
        </div>
        <el-image
          v-if="isImage(file)"
          class="w_100 h_100 thumbnail"
          fit="cover"
          :src="file.url"
        ></el-image>
        <div v-else class="w_100 h_100 flex center">
          <icon-font
            :color="iconStyle[file.url.replace($FILE_PATH, '')]?.color"
            :size="iconStyle[file.url.replace($FILE_PATH, '')]?.size ?? 60"
            :type="file.url.replace($FILE_PATH, '')"
          ></icon-font>
        </div>
      </div>
    </template>
    <el-popconfirm
      v-if="uploadMethod"
      title="上传方式"
      confirm-button-text="素材库"
      cancel-button-text="本地"
      cancel-button-type="info"
      @confirm="showStockLibrary"
      @cancel="showSelectFile"
    >
      <template #reference>
        <div class="w_100 h_100 prevent_box" @click.stop></div>
      </template>
    </el-popconfirm>
  </el-upload>

  <material-library
    :visible="materialShow"
    :limit="limit"
    :default-path="materialExitsList"
    @selection="materialSelection"
    @closed="materialShow = false"
  ></material-library>

  <modal-image
    v-if="previewImage"
    :visible="previewImage"
    :image-list="dialogImageUrl"
    @close="closePreviewImage"
  ></modal-image>
</template>

<style scoped lang="scss">
:deep(.el-upload--picture-card) {
  width: 80px;
  height: 80px;
  display: v-bind(uploadBtn);
  position: relative;
}
:deep(.el-upload-list--picture-card) {
  --el-upload-list-picture-card-size: 80px;
}

.status_label,
.item-actions {
  z-index: 1;
}

.prevent_box {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
