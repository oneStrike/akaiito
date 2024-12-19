<script setup lang="ts">
defineOptions({
  name: 'ComicContent',
})

const props = withDefaults(defineProps<{
  comicId: number,
  chapterId: number
}>(), {})

const content = defineModel('content', { default: () => [] })
const showModel = defineModel('show', { default: false })
</script>

<template>
  <es-modal v-model="showModel" />
</template>

<style scoped lang="scss">

</style>
