<script setup lang="ts">
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import { tinymceConfig } from '@/components/Editor/tinymce'

interface EditorProps {
  modelValue?: string
  height?: string | number
  width?: string | number
  placeholder?: string | number
}

const props = withDefaults(defineProps<EditorProps>(), {
  modelValue: '',
  height: '480px',
  width: '100%'
})

const emits = defineEmits<{
  (event: 'update:modelValue', data: string): void
}>()



const editorData = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})



const defaultId =
  'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
tinymceConfig.elector = `#${defaultId}`
if (props.height) tinymceConfig.height = props.height as string

if (props.width) tinymceConfig.width = props.width as string
if (props.placeholder) tinymceConfig.placeholder = props.placeholder as string
</script>

<template>
  <Editor :id="defaultId" v-model="editorData" :init="tinymceConfig" />
</template>

<style lang="scss">
.tox-tinymce-aux {
  z-index: 999999 !important;
}
</style>
