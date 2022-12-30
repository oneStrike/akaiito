<script setup lang="ts">
import OverallPage from '@/views/App/Devise/PageDiy/attr/OverallPage.vue'
import AttrNavBar from '@/views/App/Devise/PageDiy/attr/AttrNavBar.vue'
import AttrSearch from '@/views/App/Devise/PageDiy/attr/AttrSearch.vue'
import { useDiyStore } from '@/stores'
import AttrBasic from '@/views/App/Devise/PageDiy/attr/AttrBasic.vue'
const diyStore = useDiyStore()
const { currentModule } = storeToRefs(diyStore)
const components: Record<string, any> = {
  AttrNavBar,
  AttrSearch,
  AttrBasic
}
</script>

<template>
  <OverallPage v-if="currentModule === null"></OverallPage>
  <el-tabs
    type="border-card"
    class="demo-tabs"
    v-else-if="currentModule.attrComponent"
  >
    <el-tab-pane label="个性配置">
      <component :is="components[currentModule.attrComponent]"></component>
    </el-tab-pane>
    <el-tab-pane label="基础配置">
      <attr-basic></attr-basic>
    </el-tab-pane>
  </el-tabs>
</template>

<style scoped></style>
