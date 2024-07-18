<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
view {
  box-sizing: border-box;
}

page {
  box-sizing: border-box;
  /* #ifndef H5*/
  width: 100vw;
  height: 100vh;
  /* #endif*/
  /* #ifdef H5*/
  width: 100%;
  height: 100%;
  /* #endif*/
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>
