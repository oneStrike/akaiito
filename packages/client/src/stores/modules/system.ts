import { useStorage } from "@/hooks/useStorage";
import { StorageEnum } from "@/enum/storage";
import { AdminSystemConfigRes } from "@/typings/store/system";

export const systemStore = defineStore("system", {
	state() {
		return {
			systemConfigInfo: {} as AdminSystemConfigRes

		};
	},
	getters: {
		//是否是安装后第一次进入，无法判断是否为新用户
		firstEntering(): boolean {
			uni.removeStorageSync(StorageEnum.FIRST_ENTERING);
			return !useStorage.get(StorageEnum.FIRST_ENTERING);
		}
	},
	actions: {}
});
