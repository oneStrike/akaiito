import { pageStore, userStore } from "@/stores";
import { RouterJumpMethodEnum } from "@/enum/router";
import { useModal } from "@/hooks/useModal";
import { routerWhiteList } from "@/config/rotuer.config";
import { utils } from "@/utils";

export interface IRouter {
	path: string;
	params?: Record<string, any> | string;
	method?: RouterJumpMethodEnum;
	beforeEach?: () => Promise<boolean>;
}

class Router {
	private tabBarPage = ["/home/home", "/news/news", "/profile/profile"];

	private async jump({ path, method, params, beforeEach }: IRouter) {
		console.log(path);
		params = params
			? Object.assign(params, utils.parseQuery(path))
			: utils.parseQuery(path);
		path = this.fullPath(path);
		const isAuth = this.isAuth(path);
		if (!isAuth) {
			useModal.show({
				content: "暂无浏览权限"
			});
			return;
		}
		const guard = beforeEach ? await beforeEach() : true;
		if (guard && method) {
			if (this.isTabBarPage(path) && method !== RouterJumpMethodEnum.RELAUNCH) {
				method = RouterJumpMethodEnum.SWITCH_TAB;
			}
			path = params
				? path + "?params=" + encodeURIComponent(JSON.stringify(params))
				: path;
			// @ts-ignore
			uni[method]({
				url: path
			});
		}
	}

	//判断用户是否拥有浏览权限
	isAuth(path: string) {
		console.log(path);
		if (routerWhiteList.includes(path)) return true;

		const { pages } = storeToRefs(pageStore());
		const { userInfo } = storeToRefs(userStore());

		for (let i = 0; i < pages.value.length; i++) {
			const item = pages.value[i];
			if (item.pagePath === path) {
				if (item.role === "normal") return true;
				if (item.role === "vip" && userInfo.value.vipStatus === 0) return false;
				return !item.vipLevel || item.vipLevel <= userInfo.value.vipLevel;
			}
		}
		return false;
	}

	//拼接完整路由地址
	fullPath(path: string) {
		const pathPrefix = this.isTabBarPage(path) ? "/pages/tab-bar" : "/pages";
		return pathPrefix + path;
	}

	//是否为tabBar页面
	isTabBarPage(path: string) {
		return path.includes("tab-bar")
			? true
			: this.tabBarPage.includes(path.split("?")[0]);
	}

	async switchTab(options: IRouter) {
		await this.jump({ ...options, method: RouterJumpMethodEnum.SWITCH_TAB });
	}

	async navigateTo(options: IRouter) {
		await this.jump({ ...options, method: RouterJumpMethodEnum.NAVIGATE });
	}

	async redirectTo(options: IRouter) {
		await this.jump({ ...options, method: RouterJumpMethodEnum.REDIRECT });
	}

	async reLaunch(options: IRouter) {
		await this.jump({ ...options, method: RouterJumpMethodEnum.RELAUNCH });
	}

	back(delta = 1) {
		uni.navigateBack({ delta });
	}
}

export const useRouter = new Router();
