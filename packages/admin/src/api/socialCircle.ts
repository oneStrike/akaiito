import kRequest from "./index";
import type {
	AdminCreateSocialCircleClassifyReq,
	AdminCreateSocialCircleClassifyRes,
	AdminCreateSocialCircleReq,
	AdminCreateSocialCircleRes,
	AdminDeleteSocialCircleClassifyReq,
	AdminDeleteSocialCircleClassifyRes,
	AdminDeleteSocialCircleReq,
	AdminDeleteSocialCircleRes,
	AdminGetSocialCircleClassifyListRes,
	AdminGetSocialCirclePageReq,
	AdminGetSocialCirclePageRes,
	AdminUpdateSocialCircleClassifyReq,
	AdminUpdateSocialCircleClassifyRes,
	AdminUpdateSocialCircleReq,
	AdminUpdateSocialCircleRes,
	AdminUpdateSocialCircleStatusReq,
	AdminUpdateSocialCircleStatusRes
} from "~@/apiTypes/socialCircle";

const context = "/socialCircle";

const api = {
	createSocialCircle: `${context}/createSocialCircle`,//创建圈子
	updateSocialCircle: `${context}/updateSocialCircle`,//更新圈子
	deleteSocialCircle: `${context}/deleteSocialCircle`,//删除圈子
	updateSocialCircleStatus: `${context}/updateSocialCircleStatus`,//,更新圈子状态
	getSocialCirclePage: `${context}/getSocialCirclePage`,//获取圈子分页列表
	createSocialCircleClassify: `${context}/createSocialCircleClassify`,//创建圈子分类
	updateSocialCircleClassify: `${context}/updateSocialCircleClassify`,//更新圈子分类
	deleteSocialCircleClassify: `${context}/deleteSocialCircleClassify`,//删除圈子分类
	getSocialCircleClassifyList: `${context}/getSocialCircleClassifyList`//获取圈子列表
};


export function createSocialCircle(params: AdminCreateSocialCircleReq): Promise<AdminCreateSocialCircleRes> {
	return kRequest.post({
		url: api.createSocialCircle,
		data: params
	});
}

export function updateSocialCircle(params: AdminUpdateSocialCircleReq): Promise<AdminUpdateSocialCircleRes> {
	return kRequest.post({
		url: api.updateSocialCircle,
		data: params
	});
}

export function deleteSocialCircle(params: AdminDeleteSocialCircleReq): Promise<AdminDeleteSocialCircleRes> {
	return kRequest.post({
		url: api.deleteSocialCircle,
		data: params
	});
}

export function updateSocialCircleStatus(params: AdminUpdateSocialCircleStatusReq): Promise<AdminUpdateSocialCircleStatusRes> {
	return kRequest.post({
		url: api.updateSocialCircleStatus,
		data: params
	});
}

export function getSocialCirclePage(params: AdminGetSocialCirclePageReq): Promise<AdminGetSocialCirclePageRes> {
	return kRequest.get({
		url: api.getSocialCirclePage,
		params
	});
}


export function createSocialCircleClassify(params: AdminCreateSocialCircleClassifyReq): Promise<AdminCreateSocialCircleClassifyRes> {
	return kRequest.post({
		url: api.createSocialCircleClassify,
		data: params
	});
}


export function updateSocialCircleClassify(params: AdminUpdateSocialCircleClassifyReq): Promise<AdminUpdateSocialCircleClassifyRes> {
	return kRequest.post({
		url: api.updateSocialCircleClassify,
		data: params
	});
}


export function deleteSocialCircleClassify(params: AdminDeleteSocialCircleClassifyReq): Promise<AdminDeleteSocialCircleClassifyRes> {
	return kRequest.post({
		url: api.deleteSocialCircleClassify,
		data: params
	});
}

export function getSocialCircleClassifyList(): Promise<AdminGetSocialCircleClassifyListRes> {
	return kRequest.get({
		url: api.getSocialCircleClassifyList
	});
}
