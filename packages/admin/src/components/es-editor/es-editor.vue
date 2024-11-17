<script lang="ts" setup>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

export interface EsEditorProps {
  placeholder?: string
  mode?: 'default'
}

const props = withDefaults(defineProps<EsEditorProps>(), {
  placeholder: '请输入内容...',
  mode: 'default',
})

const modelValue = defineModel({ type: String, default: '' })

const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: props.placeholder }

// 编辑器回调函数
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

<template>
  <div style="border: 1px solid #ccc; margin-top: 10px">
    <Toolbar :editor="editorRef" :default-config="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor
      v-model="modelValue"
      :default-config="editorConfig"
      :mode="mode"
      style="height: 300px; overflow-y: hidden"
      @on-created="handleCreated"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.w-e-text-placeholder) {
  top: 10px;
}
</style>

<style>
.w-e-full-screen-container {
  z-index: 9999999 !important;
}
</style>
