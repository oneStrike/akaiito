<script lang="ts" setup>
defineOptions({
  name: 'ContentLayout',
})
</script>

<template>
  <div id="main_page" class="p-4 rounded-lg h-full">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <Transition mode="out-in" name="scale">
          <component :is="Component" v-if="route.meta?.cache" :key="route.path" />
        </Transition>
      </keep-alive>
      <Transition mode="out-in" name="scale">
        <component :is="Component" v-if="!route.meta.cache" :key="route.path" />
      </Transition>
    </router-view>
  </div>
</template>
