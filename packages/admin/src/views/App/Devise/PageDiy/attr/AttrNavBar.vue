<script setup lang="ts">
import Ribbon from '@/views/App/Devise/PageDiy/modules/components/Ribbon.vue'
import { useDiyStore } from '@/stores'
import { findFormItem } from '@/utils'
import { navBarForm } from '@/views/App/Devise/PageDiy/attr/shared'
import type { IDiyPageNavBar } from '~@/diyPageModule'
const navBarFormOptions = navBarForm()
const diyStore = useDiyStore()

const { currentModule } = storeToRefs(diyStore)
const customRibbonShow = ref(false)
watch(
  currentModule,
  (val) => {
    if (val) {
      const text = findFormItem(navBarFormOptions, 'text')
      const textColor = findFormItem(navBarFormOptions, 'textColor')
      const attr = val.attr as IDiyPageNavBar
      //自定义功能区
      text.componentProps.bind!.disabled = attr.enableRibbon
      textColor.componentProps.bind!.disabled = attr.enableRibbon
      customRibbonShow.value = attr.enableRibbon
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <basic-form
    v-if="currentModule"
    v-model="currentModule.attr"
    :label-width="120"
    :show-btn="false"
    :options="navBarFormOptions"
  >
  </basic-form>
  <Ribbon
    v-if="customRibbonShow && currentModule"
    v-model="currentModule.attr.ribbon"
    :search-box="true"
    :max-ribbon="4"
  ></Ribbon>
</template>

<style scoped lang="scss"></style>
