<script setup lang="ts">
import { useStorage } from "@/hooks/useStorage";
import { StorageEnum } from "@/enum/storage";
import { useRouter } from "@/hooks/useRouter";
import { getSocialCirclePageApi } from "@/api/socialCircle/socialCircle";
import { ClientGetSocialCirclePageRes } from "~@/apiTypes/socialCirlce";

const skipGuide = () => {
	useRouter.redirectTo({
		path: "/home/home"
	});
	useStorage.set(StorageEnum.FIRST_ENTERING, 1);
};

const socialCircle = ref<ClientGetSocialCirclePageRes>();
const getSocialCircle = async () => {
	socialCircle.value = await getSocialCirclePageApi({ guide: "1" });
	console.log(socialCircle.value);
};
getSocialCircle();
</script>

<template>
	<view class="container">
		<lk-view class="head">
			<lk-view center mode="box">
				<lk-text text="选择你感兴趣的方向" strong size="utmost" />
			</lk-view>
			<lk-text text="为你推荐丰富多样的内容" align="center" class="w_100" />
		</lk-view>

		<lk-view mode="box" class="content h_100" flex v-if="socialCircle">
			<lk-view v-for="item in socialCircle.list" :key="item.id" class="mb_16 mr_16 pos_re item" center column>
				<image :src="$FILE_PATH + item.icon" class="icon border_radius_small mb_8"></image>
				<lk-text :text="item.name" size="small" align="center" />
				<view class="check_status pos_ab">
					<lk-text icon="circle" type="minor" size="huge" />
				</view>
			</lk-view>
		</lk-view>
		<lk-view between center mode="box" class="btn">
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

	.item {
		width: 110px;

		.icon {
			width: 80px;
			height: 80px;
		}

		.check_status {
			top: 0;
			right: 10px;
		}
	}

}
</style>
