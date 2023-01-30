<script setup lang="ts">
import { useDiyStore } from '@/stores'
import { findFormItem } from '@/utils'
import { searchForm } from '@/views/App/Devise/PageDiy/attr/shared'
import type { IDiyPageSearch } from '~@/diyPageModule'
const searchFormOptions = searchForm()
const diyStore = useDiyStore()

const handlerPlaceholder = (placeholder?: string) => {
  if (!placeholder) return 'hot'
  if (placeholder.includes(',') || placeholder.includes('，')) return 'swiper'
  return 'text'
}

watch(
  () => diyStore.currentModule?.attr as IDiyPageSearch,
  (val) => {
    if (!val) return
    val.searchPlaceholderType = handlerPlaceholder(
      val.searchPlaceholder as string
    )
    if (val.searchIcon && Array.isArray(val.searchIcon) && val.searchIcon[0]) {
      const icon = val.searchIcon[0]
      const iconColor = findFormItem(searchFormOptions, 'searchIconColor')
      iconColor.hide = icon.mimeType !== 'icon'
    }
  },
  { deep: true }
)
</script>

<template>
  <div>
    <basic-form
      v-if="diyStore.currentModule"
      v-model="diyStore.currentModule.attr"
      :label-width="120"
      :show-btn="false"
      :options="searchFormOptions"
    ></basic-form>
  </div>
</template>
