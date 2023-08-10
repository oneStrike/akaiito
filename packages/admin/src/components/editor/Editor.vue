<script setup lang="ts">
import tinymce from 'tinymce'
import Editor from '@tinymce/tinymce-vue'
import { tinymceConfig } from '@/components/editor/tinymce'

interface EditorProps {
  modelValue?: string
  height?: number
  width?: string | number
  placeholder?: string
}

const props = withDefaults(defineProps<EditorProps>(), {
  modelValue: '',
  height: 480,
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
if (props.height) tinymceConfig.max_height = computed(() => props.height).value

if (props.width) tinymceConfig.width = computed(() => props.width).value
if (props.placeholder)
  tinymceConfig.placeholder = computed(() => props.placeholder).value
</script>

<template>
  <Editor :id="defaultId" v-model="editorData" :init="tinymceConfig" />
</template>

<style lang="scss">
.tox-tinymce-aux {
  z-index: 999999 !important;
}
</style>
