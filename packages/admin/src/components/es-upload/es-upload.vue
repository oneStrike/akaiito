<script setup lang="ts">
  /**
   * ES Upload 组件 - 基于 Element Plus Upload 的封装组件
   * 支持图片、视频、音频、压缩包等多种文件类型上传
   * 支持多种数据结构输出格式（string、json、object）
   * 集成素材库选择功能
   */
  import type {
    UploadFile,
    UploadInstance,
    UploadProps,
    UploadUserFile,
  } from 'element-plus'
  import type { FileTypesRes } from '@/apis/types/upload'
  import type { EsUploadProps } from '@/components/es-upload/types'
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
      fileName: name || path.split('/').at(-1) || '',
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

    try {
      // 处理数组格式
      if (Array.isArray(props.modelValue)) {
        return props.modelValue
          .map((item: any) => {
            const filePath =
              typeof item === 'string' ? item : item.filePath || item.url
            if (!filePath) {
              console.warn('ES Upload: 文件路径为空', item)
              return null
            }
            return filePathToObj(filePath, item.fileName || item.name)
          })
          .filter(Boolean) as UploadUserFile[]
      }

      // 处理JSON字符串格式
      if (
        typeof props.modelValue === 'string' &&
        utils.isJson(props.modelValue)
      ) {
        const parsedData = JSON.parse(props.modelValue)
        if (Array.isArray(parsedData)) {
          return parsedData.map((item: any) => ({
            ...item,
            name: item.fileName || item.name,
            url: item.filePath || item.url,
          }))
        }
      }

      // 处理单个字符串格式
      if (typeof props.modelValue === 'string') {
        return [filePathToObj(props.modelValue)]
      }

      // 处理单个对象格式
      if (typeof props.modelValue === 'object') {
        const { filePath, url, fileName, name } = props.modelValue
        if (filePath) {
          return [filePathToObj(filePath || url, fileName || name)]
        }
      }
    } catch (error) {
      console.error('ES Upload: modelValue 转换失败', error, props.modelValue)
      emits('updateError', [error as Error])
    }

    return []
  }

  // 响应式数据
  const fileList = ref<UploadUserFile[]>([])
  const previewImages = ref<UploadFile[]>([])

  /**
   * 计算上传按钮显示状态
   * 当文件数量达到最大限制时隐藏上传按钮
   */
  const uploadBtnDisplay = computed(() =>
    fileList.value?.length >= props.maxCount ? 'none' : 'inline-flex',
  )

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
   * 计算文件类型接受列表
   * 根据 fileType 属性生成对应的 MIME 类型字符串
   * @returns 文件类型接受字符串，用于 input[type=file] 的 accept 属性
   */
  const accept = computed(() => {
    // 如果未指定文件类型，接受所有文件
    if (!props.fileType) {
      return '*'
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

    // 检查文件数量限制
    if (fileList.value?.length >= props.maxCount) {
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
   * 自定义文件上传函数
   * @param options 上传选项，包含文件信息
   * @returns 上传结果
   */
  const upload: UploadProps['httpRequest'] = async ({ file }) => {
    try {
      const uploadRes = await useUpload(
        file,
        props.data || {},
        props.contentType,
      )

      if (uploadRes?.success) {
        emits('change', uploadRes.success)
      } else {
        throw new Error('上传响应格式错误')
      }
      return uploadRes?.success
    } catch (error) {
      console.error('ES Upload: 文件上传失败', error)
      useMessage.error(`文件【${file.name}】上传失败`)
      emits('updateError', [error as Error])
      throw error
    }
  }

  /**
   * 文件移除处理函数
   * @param uploadFile 要移除的文件对象
   */
  function remove(uploadFile: UploadFile) {
    try {
      emits('remove', uploadFile)
    } catch (error) {
      console.error('ES Upload: 移除文件失败', error)
      useMessage.error('移除文件失败')
    }
  }

  /**
   * 文件列表变化处理函数
   * 根据 structure 属性格式化输出数据
   */
  function change() {
    try {
      if (!fileList.value?.length) {
        emits('update:modelValue', props.structure === 'string' ? '' : [])
        return
      }
      console.log(fileList.value)
      // 提取文件信息
      const emitData: FileTypesRes = fileList.value
        .map((item: any) => {
          const target = item.response || item
          return {
            fileName: target.fileName || target.name,
            filePath: target.filePath || target.url,
            mimeType: target.mimeType,
          }
        })
        .filter((item) => item.filePath) // 过滤掉无效数据
      console.log(emitData)
      if (!emitData.length) {
        emits('update:modelValue', props.structure === 'string' ? '' : [])
        return
      }

      // 根据结构类型格式化数据
      let result: string | string[] | FileTypesRes[]
      switch (props.structure) {
        case 'json':
          result = JSON.stringify(emitData)
          break
        case 'string':
          result = emitData.map((item) => item.filePath).join(',') || ''
          break
        case 'object':
        default:
          result = emitData
          break
      }

      emits('update:modelValue', result)
    } catch (error) {
      console.error('ES Upload: 处理文件变化失败', error)
      emits('updateError', [error as Error])
    }
  }
</script>

<template>
  <!-- ES Upload 组件容器 -->
  <div class="w-full es-upload">
    <!-- Element Plus Upload 组件 -->
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="accept"
      :multiple="multiple"
      :on-preview="onPreview"
      :on-change="change"
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
