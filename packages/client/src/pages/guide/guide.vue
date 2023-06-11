<script setup lang="ts">
import { useStorage } from "@/hooks/useStorage";
import { StorageEnum } from "@/enum/storage";
import { useRouter } from "@/hooks/useRouter";

const skipGuide = () => {
	useRouter.redirectTo({
		path: "/home/home"
	});
	useStorage.set(StorageEnum.FIRST_ENTERING, 1);
};
</script>

<template>
	<view class="container">
		<lk-view class="head">
			<lk-view center mode="box">
				<lk-text text="选择你感兴趣的方向" strong size="utmost" />
			</lk-view>
			<lk-text text="为你推荐丰富多样的内容" align="center" class="w_100" />
		</lk-view>

		<lk-view mode="box" class="content h_100" type="primary"> 21</lk-view>
		<lk-view flex between mode="box" class="btn">
			<lk-button class="next" text="一键开启推荐"></lk-button>
			<lk-text center type="minor" size="small" text="直接进入" @click="skipGuide" />
		</lk-view>
	</view>
</template>

<style scoped lang="scss">
.container {
	padding-top: 50px;

	.skip_btn {
		right: 20px;
	}

	.btn {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 30rpx;

		.next {
			width: 380rpx;
		}
	}
}
</style>
