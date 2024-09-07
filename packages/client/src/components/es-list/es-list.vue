<script setup lang="ts">
defineOptions({
  name: 'EsList',
  options: {
    virtualHost: true,
  },
})

const props = withDefaults(defineProps<EsListProps>(), {
  data: () => [],
  loading: false,
})

export interface EsListProps {
  data?: any[]
  total?: number
  loading?: boolean
}

const loadMoreStatus = computed(() => {
  if (!props.total || props.data.length >= props.total) {
    return 'noMore'
  } else if (props.loading) {
    return 'loading'
  } else {
    return 'more'
  }
})
</script>

<template>
  <view>
    <slot />
    <uni-load-more v-if="data.length" icon-type="snow" :status="loadMoreStatus" />
    <es-empty v-if="!data.length && !loading" />
  </view>
</template>
