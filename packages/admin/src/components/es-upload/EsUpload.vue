<script setup lang="ts">
  import type {
    UploadFile,
    UploadInstance,
    UploadProps,
    UploadUserFile,
  } from 'element-plus'
  import type { FileTypesRes } from '@/apis/types/upload'
  import type { EsUploadProps } from '@/components/es-upload/types'
  /**
   * ES Upload 组件 - 基于 Element Plus Upload 的封装组件
   * 支持图片、视频、音频、压缩包等多种文件类型上传
   * 支持多种数据结构输出格式（string、json、object）
   * 集成素材库选择功能
   */
  import { onUnmounted } from 'vue'
  import { config } from '@/config'
  import { useMessage } from '@/hooks/useFeedback'
  import { useUpload } from '@/hooks/useUpload'
  import { utils } from '@/utils'

  // Props 定义 - 组件属性配置
  const props = withDefaults(defineProps<EsUploadProps>(), {
    listType: 'picture-card', // 默认卡片式布局
    maxSize: config.upload.maxUploadFileSize, // 默认最大文件大小
    maxCount: 1, // 默认最大上传数量
    structure: 'string', // 默认返回字符串格式
  })

  // Events 定义 - 组件事件
  const emits = defineEmits<{
    /** 文件上传成功后触发 */
    (event: 'change', data: FileTypesRes): void
    /** 文件移除时触发 */
    (event: 'remove', data: UploadFile): void
    /** v-model 双向绑定更新 */
    (event: 'update:modelValue', data: string | string[] | FileTypesRes[]): void
    /** 上传错误时触发 */
    (event: 'updateError', data: Error[]): void
  }>()

  // 组件引用
  const uploadRef = ref<UploadInstance>()

  /**
   * 将文件路径转换为文件对象
   * @param path 文件路径
   * @param name 文件名称（可选）
   * @returns 标准化的文件对象
   */
  function filePathToObj(path: string, name?: string): UploadUserFile {
    const fileExtension = path.split('.').at(-1) || ''
    const mimeType = props.fileType
      ? `${props.fileType}/${fileExtension}`
      : `application/${fileExtension}`

    return {
      filename: name || path.split('/').at(-1) || '',
      name: name || path.split('/').at(-1) || '',
      filePath: path,
      url: path,
      mimeType,
      status: 'success',
      uid: utils.generateRandomNumber(10),
    } as UploadUserFile
  }

  /**
   * 转换 modelValue 为组件内部使用的文件列表格式
   * 支持多种输入格式：字符串、数组、JSON字符串
   * @returns 标准化的文件列表
   */
  function transformModelValue(): UploadUserFile[] {
    if (!props.modelValue) {
      return []
    }
    if (typeof props.modelValue === 'string') {
      const parseRes = utils.parseJson(props.modelValue)
      if (parseRes === props.modelValue) {
        return [filePathToObj(props.modelValue)]
      }
      return parseRes.map((item: any) => ({
        ...item,
        name: item.fileName || item.name,
        url: item.filePath || item.url,
      }))
    }
    // 处理数组格式
    if (Array.isArray(props.modelValue)) {
      return props.modelValue
        .map((item: any) => {
          const filePath =
            typeof item === 'string' ? item : item.filePath || item.url
          if (!filePath) {
            return null
          }
          return filePathToObj(filePath, item.fileName || item.name)
        })
        .filter(Boolean) as UploadUserFile[]
    }
    if (typeof props.modelValue === 'object') {
      const { filePath, url, fileName, name } = props.modelValue
      if (filePath) {
        return [filePathToObj(filePath || url, fileName || name)]
      }
    }
    return []
  }

  // 响应式数据
  const fileList = ref<UploadUserFile[]>([])
  const previewImages = ref<UploadFile[]>([])

  // 批量上传相关状态
  const pendingFiles = ref<File[]>([])
  const uploadTimer = ref<number | null>(null)

  /**
   * 计算上传按钮显示状态
   * 当文件数量达到最大限制时隐藏上传按钮（考虑待上传文件队列）
   */
  const uploadBtnDisplay = computed(() => {
    const currentFileCount = fileList.value?.length || 0
    const pendingFileCount = pendingFiles.value?.length || 0
    const totalFileCount = currentFileCount + pendingFileCount
    return totalFileCount >= props.maxCount ? 'none' : 'inline-flex'
  })

  /**
   * 监听 modelValue 变化，同步更新内部文件列表
   */
  watch(
    () => props.modelValue,
    (val) => {
      fileList.value = val ? transformModelValue() : []
    },
    { deep: true, immediate: true },
  )

  /**
   * 组件卸载时清理定时器
   */
  onUnmounted(() => {
    if (uploadTimer.value) {
      window.clearTimeout(uploadTimer.value)
      uploadTimer.value = null
    }
  })

  /**
   * 计算文件类型接受列表
   * 根据 fileType 属性生成对应的 MIME 类型字符串
   * @returns 文件类型接受字符串，用于 input[type=file] 的 accept 属性
   */
  const accept = computed(() => {
    if (!props.fileType) {
      return ''
    }

    // 获取配置中允许的文件类型
    const allowFileType = config.upload.allowFileType?.[props.fileType]
    if (!allowFileType || !Array.isArray(allowFileType)) {
      console.warn(`ES Upload: 未找到文件类型 '${props.fileType}' 的配置`)
      return props.fileType
    }

    // 根据文件类型生成 MIME 类型列表
    return allowFileType
      .map((item: string) => {
        // 压缩文件特殊处理
        if (props.fileType === 'compressed') {
          return `application/x-${item}-compressed`
        }
        return `${props.fileType}/${item}`
      })
      .join(',')
  })

  /**
   * 文件上传前的验证函数
   * 检查文件数量、大小、格式等限制
   * @param rawFile 待上传的原始文件
   * @returns 验证通过返回 true，否则返回 false
   */
  const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const fileName = rawFile.name

    // 检查文件数量限制（考虑当前文件列表和待上传文件队列）
    const currentFileCount = fileList.value?.length || 0
    const pendingFileCount = pendingFiles.value?.length || 0
    const totalFileCount = currentFileCount + pendingFileCount + 1

    if (totalFileCount > props.maxCount) {
      useMessage.error(
        `文件【${fileName}】上传失败：超出最大数量限制（${props.maxCount}个）`,
      )
      return false
    }

    // 检查文件大小限制
    const maxSizeInBytes = props.maxSize * 1024 * 1024
    if (rawFile.size > maxSizeInBytes) {
      const maxSizeMB = props.maxSize
      const fileSizeMB = (rawFile.size / (1024 * 1024)).toFixed(2)
      useMessage.error(
        `文件【${fileName}】上传失败：文件大小（${fileSizeMB}MB）超出限制（${maxSizeMB}MB）`,
      )
      return false
    }

    // 检查文件格式限制
    if (accept.value !== '*' && !accept.value.includes(rawFile.type)) {
      useMessage.error(
        `文件【${fileName}】上传失败：不支持的文件格式（${rawFile.type}）`,
      )
      return false
    }

    return true
  }

  /**
   * 文件预览处理函数
   * 仅对图片文件进行预览
   * @param uploadFile 要预览的文件对象
   */
  function onPreview(uploadFile: UploadFile) {
    try {
      const fileExtension =
        uploadFile.url?.split('.').at(-1)?.toLowerCase() ?? ''
      const imageTypes = config.upload.allowFileType?.image || []

      if (imageTypes.includes(fileExtension)) {
        previewImages.value = [uploadFile]
      } else {
        useMessage.info('该文件类型不支持预览')
      }
    } catch (error) {
      console.error('ES Upload: 预览文件失败', error)
      useMessage.error('预览文件失败')
    }
  }

  /**
   * 处理emit丢出的数据格式
   */
  function handleEmitData() {
    const emitData =
      props.structure === 'string'
        ? fileList.value.map((item) => item.url).join(',')
        : props.structure === 'json'
          ? JSON.stringify(fileList.value)
          : fileList.value
    // @ts-expect-error ignore
    emits('update:modelValue', emitData)
  }

  /**
   * 批量上传处理函数
   * 收集所有待上传文件，延迟执行批量上传
   */
  async function processBatchUpload() {
    if (pendingFiles.value.length === 0) return

    const filesToUpload = [...pendingFiles.value]
    pendingFiles.value = []

    const uploadRes = await useUpload(
      filesToUpload,
      props.data || {},
      props.contentType,
    )

    if (uploadRes?.success) {
      // FileTypesRes 本身就是数组类型，直接触发change事件
      emits('change', uploadRes.success)
      const elUpload = uploadRes.success.map((item) => ({
        ...item,
        url: item.filePath,
      }))
      // @ts-expect-error ignore
      fileList.value = [...fileList.value, ...elUpload]
      handleEmitData()
    } else {
      throw new Error('上传响应格式错误')
    }
  }

  /**
   * 自定义文件上传函数
   * 支持单文件和多文件批量上传
   * @param options 上传选项，包含文件信息
   * @returns 上传结果
   */
  const upload: UploadProps['httpRequest'] = async ({ file }) => {
    // 将文件添加到待上传队列
    pendingFiles.value.push(file)
    // 清除之前的定时器
    if (uploadTimer.value) {
      clearTimeout(uploadTimer.value)
    }

    // 设置延迟执行批量上传（100ms后执行，确保所有文件都收集完毕）
    uploadTimer.value = window.setTimeout(() => {
      processBatchUpload()
    }, 50)
  }

  /**
   * 文件移除处理函数
   * @param uploadFile 要移除的文件对象
   */
  function remove(uploadFile: UploadFile) {
    const fileIndex = fileList.value.findIndex(
      (item) => item.url === uploadFile.url,
    )
    if (fileIndex !== -1) {
      handleEmitData()
    }
    emits('remove', uploadFile)
  }
</script>

<template>
  <!-- ES Upload 组件容器 -->
  <div class="w-full es-upload">
    <!-- Element Plus Upload 组件 -->
    <el-upload
      ref="uploadRef"
      :file-list="fileList"
      :list-type="listType"
      :accept="accept"
      :multiple="multiple"
      :on-preview="onPreview"
      :on-remove="remove"
      :before-upload="beforeUpload"
      :http-request="upload"
      class="es-upload__wrapper"
    >
      <!-- 上传触发器 -->
      <template #trigger>
        <!-- 素材库模式：支持从素材库选择或本地上传 -->
        <div v-if="assetLibrary" class="w-full h-full">
          <el-popconfirm
            width="180"
            title="请选择上传方式"
            cancel-button-text="素材库"
            confirm-button-text="本地上传"
            :hide-after="10"
            @confirm="uploadRef?.$el?.querySelector('input')?.click()"
          >
            <template #reference>
              <div
                class="w-full h-full flex-center upload-trigger"
                role="button"
                tabindex="0"
                aria-label="选择上传方式"
                @click.stop
              >
                <es-icon name="uploading" :size="26" />
              </div>
            </template>
          </el-popconfirm>
        </div>

        <!-- 普通模式：直接上传 -->
        <template v-else>
          <!-- 卡片式布局 -->
          <div
            v-if="listType === 'picture-card'"
            class="flex items-center text-#dcdfe6 uploading"
            role="button"
            tabindex="0"
            aria-label="上传文件"
          >
            <es-icon name="uploading" :size="22" />
          </div>

          <!-- 按钮式布局 -->
          <el-button v-else type="primary" class="upload-button">
            <es-icon name="uploading" :size="22" />
            上传文件
          </el-button>
        </template>
      </template>
    </el-upload>

    <!-- 图片预览组件 -->
    <es-preview-image
      v-if="previewImages.length > 0"
      :url-list="previewImages"
      @close="previewImages = []"
    />
  </div>
</template>

<style scoped lang="scss">
  /* ES Upload 组件样式 */
  .es-upload {
    &__wrapper {
      width: 100%;
    }
  }

  .upload-button {
    transition: all 0.3s ease;
  }

  /* Element Plus Upload 组件样式覆盖 */
  :deep(.el-upload--picture-card) {
    width: 88px;
    height: 88px;
    display: v-bind(uploadBtnDisplay);
    border: 2px dashed var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    transition: border-color 0.3s ease;

    &:hover {
      border-color: var(--el-color-primary);

      .uploading {
        color: var(--el-color-primary);
      }
    }
  }

  :deep(.el-upload--text) {
    display: v-bind(uploadBtnDisplay);
  }

  /* 文件列表样式 */
  :deep(.el-upload-list--picture-card) {
    .el-upload-list__item {
      width: 88px;
      height: 88px;
      border-radius: var(--el-border-radius-base);
      overflow: hidden;

      .el-upload-list__item-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    :deep(.el-upload--picture-card) {
      width: 72px;
      height: 72px;
    }

    :deep(.el-upload-list--picture-card) {
      .el-upload-list__item {
        width: 72px;
        height: 72px;
      }
    }
  }
</style>
