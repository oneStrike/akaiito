<script setup lang="ts">
import { baseModule } from '@/views/App/Devise/PageDiy/modules/modules'
import { useDiyStore } from '@/stores'
import type { IDiyModule } from '~@/diyPage'
import { createDiyApi, modifyDiyApi } from '@/api/diy/diy'
import { useMessage } from '@/hooks/useMessage'
import { Hint } from '@/utils/hint'

const emits = defineEmits<{
  (event: 'closed', data?: boolean): void
}>()

const modules = markRaw<IDiyModule[]>(baseModule)
const diyStore = useDiyStore()
//开始拖动模块
const dragstart = (event: Event, item: IDiyModule) => {
  diyStore.dragData = item
  diyStore.dragStatus = true
}

//拖动结束
const dragend = () => {
  diyStore.dragStatus = false
}

//配置整体页面
const overallPageConfig = () => {
  diyStore.setCurrentModuleIndex(null)
}

//点击添加diy组件
const addModel = (item: IDiyModule) => {
  diyStore.setLayoutData(item)
}

const modelInputShow = ref(false)
const modalInputAttr = {
  placeholder: '请输入页面名称',
  maxlength: 20,
  showWordLimit: true
}
//另存为布局信息
const saveAs = async (val: string | number) => {
  const overallPage = JSON.parse(JSON.stringify(diyStore.overallPage))
  overallPage.pageName = val
  const jsonDiyData = JSON.stringify({
    page: overallPage,
    modules: diyStore.layoutData
  })
  await createDiyApi({
    diyName: overallPage.pageName,
    diyData: jsonDiyData
  })
  modelInputShow.value = false
  useMessage('success', Hint.ADD_SUC)
}
//保存布局信息
const saveLayoutData = async (isBack = false) => {
  const jsonDiyData = JSON.stringify({
    page: diyStore.overallPage,
    modules: diyStore.layoutData
  })
  if (diyStore.reEditDiyData) {
    diyStore.reEditDiyData.diyData = jsonDiyData
    await modifyDiyApi(diyStore.reEditDiyData)
  } else {
    await createDiyApi({
      diyName: diyStore.overallPage.pageName,
      diyData: jsonDiyData
    })
  }

  useMessage('success', diyStore.reEditDiyData ? Hint.UPD_SUC : Hint.ADD_SUC)
  diyStore.$reset()
  isBack && emits('closed', isBack)
}
</script>

<template>
  <div class="w_100 h_100 flex_col main_between">
    <el-form>
      <el-form-item required label="页面配置">
        <el-button @click="overallPageConfig">设置</el-button>
      </el-form-item>
      <el-form-item required label="手机状态栏">
        <el-switch v-model="diyStore.phoneStatusBar" class="ml-2" />
      </el-form-item>
    </el-form>
    <div class="flex1 content_box over_scroll_y mb_1 mt_1">
      <el-collapse model-value="base">
        <el-collapse-item name="base">
          <template #title>
            <div class="fw_b fs16">基础组件</div>
          </template>
          <div class="flex w_100">
            <div class="flex module_box flex_wrap">
              <div
                class="flex_col main_around cross_center cursor_move module_item tt_all"
                v-for="item in modules"
                :key="item.type"
                draggable="true"
                @dragstart="dragstart($event, item)"
                @dragend="dragend"
                @click="addModel(item)"
              >
                <svg-icon size="40" :icon-name="item.icon"></svg-icon>
                <span>{{ item.name }}</span>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="btns w_100 flex main_around">
      <el-button @click="emits('closed')">取消</el-button>
      <el-button type="primary" @click="saveLayoutData(true)">保存</el-button>
      <el-button @click="modelInputShow = true">另存为</el-button>
    </div>

    <modal-input
      :visible="modelInputShow"
      title="另存为"
      label="页面名称"
      :required="true"
      :inputAttr="modalInputAttr"
      @closed="modelInputShow = false"
      @complete="saveAs"
    ></modal-input>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/variable.scss' as *;
.content_box {
  .module_box {
    .module_item {
      height: 87px;
      width: 87px;
      border: 1px solid $border_color;

      &:hover {
        color: $primary_color;
        border-color: $primary_color;
      }
    }
  }
}
</style>
