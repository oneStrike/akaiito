import { useStorage } from "@/hooks/useStorage";
import { StorageEnum } from "@/enum/storage";
import type { AdminSystemConfigRes } from "@akaiito/typings/src/admin/apiTypes/clientManage";

export const systemStore = defineStore("system", {
	state() {
		return {
			systemConfigInfo: {} as AdminSystemConfigRes,
			themeColor: false
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
