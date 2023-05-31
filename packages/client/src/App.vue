<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { bootstrapThing } from "@/core/bootstrap";

onLaunch(() => {
	console.log("App Launch");
	bootstrapThing();
});
onShow(() => {
	console.log("App Show");
});
onHide(() => {
	console.log("App Hide");
});
</script>
<style lang="scss">
@import "./static/styles/common.scss";
@import './static/iconfont/font.scss';

text, view {
	color: $fontColor1
}

view {
	box-sizing: border-box;
}
</style>
