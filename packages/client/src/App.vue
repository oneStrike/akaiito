<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { bootstrapThing } from "@/core/bootstrap";
import { themeStore } from "@/stores";

const useThemeStore = themeStore();

const defaultFontColor = computed(() => {
	return useThemeStore.fontColorScheme.default;
});

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
	color: v-bind(defaultFontColor)
}

view {
	box-sizing: border-box;
}

.button-hover {
	opacity: 0.7;
}
</style>
