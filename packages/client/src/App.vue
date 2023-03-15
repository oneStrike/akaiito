<script setup lang='ts'>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { bootstrapThing } from '@/core/bootstrap'

onLaunch(() => {
	console.log('App Launch')
	bootstrapThing()
})
onShow(() => {
	console.log('App Show')
})
onHide(() => {
	console.log('App Hide')
})
</script>
<style lang='scss'>
/* #ifndef APP-PLUS*/
@import './static/iconfont/font.scss';
/* #endif*/
@import "./static/styles/common.scss";
</style>
