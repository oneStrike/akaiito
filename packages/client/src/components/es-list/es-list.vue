<script setup lang="ts">
defineOptions({
  name: 'EsList'
})

export interface EsListProps {
  data?: any[]
  total?: number
  loading?: boolean
}

const props = withDefaults(defineProps<EsListProps>(), {
  data: () => [],
  loading: false
})

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
    <view v-for="(item, idx) in data" :key="idx">
      <slot :record="item" :index="idx"></slot>
    </view>
    <uni-load-more
      v-if="data.length"
      iconType="snow"
      :status="loadMoreStatus"
    />
    <es-empty v-if="!data.length && !loading" />
  </view>
</template>
