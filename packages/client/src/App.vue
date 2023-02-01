<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
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
@import './static/iconfont/font.scss';
@import '@akaiito/stylesheets/src/common/variable.scss';
@import '@akaiito/stylesheets/src/common/layout.scss';
</style>
