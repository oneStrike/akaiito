<script setup lang="ts">
import draggable from 'vuedraggable'
import type { IDiyModule } from '@/typings/components/diyPage'
import DiySearch from '@/views/App/Devise/PageDiy/modules/DiySearch.vue'
import DiyNavMenu from '@/views/App/Devise/PageDiy/modules/DiyNavMenu.vue'
import DiySwiper from '@/views/App/Devise/PageDiy/modules/DiySwiper.vue'
import DiyNotice from '@/views/App/Devise/PageDiy/modules/DiyNotice.vue'
import DiyNavBar from '@/views/App/Devise/PageDiy/modules/DiyNavBar.vue'
import DiyDivider from '@/views/App/Devise/PageDiy/modules//DiyDivider.vue'
import { useDiyStore } from '@/stores'
import config from '@/config'
const diyStore = useDiyStore()

const componentInstance = markRaw<Record<string, any>>({
  DiyNavBar,
  DiySearch,
  DiyNavMenu,
  DiySwiper,
  DiyNotice
})

//是否是draggable在拖动
const draggableStatus = ref(false)

//背景图样式
const backgroundStyle = computed(() => {
  if (diyStore.overallPage.backgroundStyle === 'color') {
    return { backgroundColor: diyStore.overallPage.backgroundColor }
  } else if (diyStore.overallPage.backgroundStyle === 'image') {
    const imageSrc = diyStore.overallPage.backgroundImage[0]?.path
    return {
      backgroundImage: `url(${config.FILE_PATH + imageSrc})`,
      backgroundSize: 'cover'
    }
  }
})

// 拖动元素进入div时触发
const dragenter = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.className.includes('drag-box')) {
    target.style.opacity = '1'
  }
}
// 拖动元素离开div时触发
const dragleave = (event: Event) => {
  const target = event.target as HTMLElement
  if (target.className.includes('drag-box')) {
    target.style.opacity = '0.4'
  }
}

//拖拽结束，添加一个模块
const drop = (index: number | DragEvent) => {
  diyStore.setLayoutData(
    diyStore.dragData as IDiyModule,
    typeof index === 'number' ? index : undefined
  )
}

//当前鼠标悬浮的模块，展示删除图标
const currentHoverIndex = ref<number | null>()

//删除一个模块
const deleteLayout = (index: number) => {
  diyStore.deleteLayoutModule(index)
}

//配置组件属性
const disposition = (item: IDiyModule, index: number) => {
  diyStore.setCurrentModuleIndex(index)
}
</script>

<template>
  <div
    :style="backgroundStyle"
    class="center_box h_100 el-card is-always-shadow ml_2 mr_2"
  >
    <div
      class="status_bar w_100"
      v-if="diyStore.overallPage.adaptiveStatusBar"
    ></div>
    <img
      v-show="
        !diyStore.dragStatus && !draggableStatus && diyStore.phoneStatusBar
      "
      class="head_img"
      src="@/assets/images/head-diy.png"
      alt="head"
    />
    <div>
      <div
        v-if="diyStore.dragStatus"
        data-id="first"
        class="drag-box flex center"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover.prevent
        @drop="drop"
      >
        放在这里
      </div>
      <draggable
        class="flex-col main_around main_center"
        v-model="diyStore.layoutData"
        group="module"
        item-key="id"
        animation="300"
        @start="draggableStatus = true"
        @end="draggableStatus = false"
      >
        <template #item="{ element, index }">
          <div
            class="pos_re"
            @mouseover="currentHoverIndex = index"
            @mouseleave="currentHoverIndex = null"
          >
            <div
              :class="
                diyStore.currentModuleIndex === index
                  ? 'border_dashed active_module'
                  : ''
              "
              v-show="!draggableStatus"
              @click="() => disposition(element, index)"
            >
              <component
                class="cursor_pointer"
                :is="componentInstance[element.module]"
                :layout="element"
              ></component>
              <diy-divider
                v-if="element.commonAttr.divider"
                :layout="element"
              ></diy-divider>
            </div>
            <el-card v-show="draggableStatus">
              <div class="w_100 tc">{{ element.name }}</div>
            </el-card>
            <div
              class="drag-box flex center"
              v-if="diyStore.dragStatus"
              :data-id="index"
              @dragenter="dragenter"
              @dragleave="dragleave"
              @dragover.prevent
              @drop="() => drop(index)"
            >
              放在这里
            </div>
            <div
              class="delete_icon"
              :style="{
                bottom: element.commonAttr.divider
                  ? element.divider.height + 'px'
                  : '3px'
              }"
            >
              <svg-icon
                v-if="currentHoverIndex === index && !draggableStatus"
                size="18"
                icon-name="delete"
                color="#f56c6c"
                @click="deleteLayout(index)"
              ></svg-icon>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/style/variable.scss' as *;
.center_box {
  width: 375px;
  box-sizing: border-box;
  position: relative;

  .status_bar {
    height: 22px;
    background: white;
  }

  .head_img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .drag-box {
    height: 80px;
    border: 1px dashed $primary_color;
    color: $primary_color;
    opacity: 0.4;
    z-index: 999;

    &-active {
      opacity: 1;
    }
  }

  .active_module {
    border-color: $primary_color;
  }

  .delete_icon {
    position: absolute;
    bottom: 3px;
    right: 3px;
  }
}
</style>
