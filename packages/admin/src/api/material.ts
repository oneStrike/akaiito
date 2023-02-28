import kRequest from './index'
import type {
	AdminCreateMaterialGroupReq,
	AdminCreateMaterialGroupRes,
	AdminCreateMaterialReq,
	AdminCreateMaterialRes,
	AdminDeleteMaterialGroupReq,
	AdminDeleteMaterialGroupRes,
	AdminDeleteMaterialReq,
	AdminDeleteMaterialRes,
	AdminGetMaterialGroupRes,
	AdminGetMaterialReq,
	AdminGetMaterialRes,
	AdminUpdateMaterialGroupReq,
	AdminUpdateMaterialGroupRes
} from '~@/apiTypes/materialLibrary'
const context = '/materialLibrary'

const api = {
	getMaterialGroup: `${context}/getMaterialGroup`,
	createMaterialGroup: `${context}/createMaterialGroup`,
	updateMaterialGroup: `${context}/updateMaterialGroup`,
	deleteMaterialGroup: `${context}/deleteMaterialGroup`,
	createMaterial: `${context}/createMaterial`,
	deleteMaterial: `${context}/deleteMaterial`,
	getMaterial: `${context}/getMaterial`
}

//获取素材库分组
export const getMaterialLibraryApi = (): Promise<AdminGetMaterialGroupRes> => {
	return kRequest.get({
		url: api.getMaterialGroup
	})
}

//创建素材库分组
export const createMaterialLibraryApi = (
	params: AdminCreateMaterialGroupReq
): Promise<AdminCreateMaterialGroupRes> => {
	return kRequest.post({
		url: api.createMaterialGroup,
		data: params
	})
}

//修改素材库分组
export const modifyMaterialLibraryApi = (
	params: AdminUpdateMaterialGroupReq
): Promise<AdminUpdateMaterialGroupRes> => {
	return kRequest.post({
		url: api.updateMaterialGroup,
		data: params
	})
}

//删除素材库分组
export const deleteMaterialLibraryApi = (
	params: AdminDeleteMaterialGroupReq
): Promise<AdminDeleteMaterialGroupRes> => {
	return kRequest.post({
		url: api.deleteMaterialGroup,
		data: params
	})
}

//添加素材
export const createMaterialApi = (
	params: AdminCreateMaterialReq
): Promise<AdminCreateMaterialRes> => {
	return kRequest.post({
		url: api.createMaterial,
		data: params
	})
}

//删除素材
export const deleteMaterialApi = (
	params: AdminDeleteMaterialReq
): Promise<AdminDeleteMaterialRes> => {
	return kRequest.post({
		url: api.deleteMaterial,
		data: params
	})
}

//获取素材
export const getMaterialApi = (
	params: AdminGetMaterialReq
): Promise<AdminGetMaterialRes> => {
	return kRequest.get({
		url: api.getMaterial,
		params
	})
}
