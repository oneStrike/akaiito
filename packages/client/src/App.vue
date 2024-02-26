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
page {
  width: 100vw;
  /* #ifndef H5*/
  height: 100vh;
  /* #endif*/
  /* #ifdef H5*/
  height: 100%;
  /* #endif*/
}
</style>
