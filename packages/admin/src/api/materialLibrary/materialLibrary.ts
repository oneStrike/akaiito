import kRequest from '../index'
import config from '@/config'
import type {
  MaterialLibraryCreateMaterialLibraryRequest,
  MaterialLibraryCreateMaterialLibraryResponse
} from '@/typings/httpTypes/materialLibrary/createMaterialLibrary'
import type {
  MaterialLibraryModifyMaterialLibraryRequest,
  MaterialLibraryModifyMaterialLibraryResponse
} from '@/typings/httpTypes/materialLibrary/modifyMaterialLibrary'

import type {
  MaterialLibraryDeleteMaterialLibraryRequest,
  MaterialLibraryDeleteMaterialLibraryResponse
} from '@/typings/httpTypes/materialLibrary/deleteMaterialLibrary'
import type {
  MaterialLibraryCreateMaterialRequest,
  MaterialLibraryCreateMaterialResponse
} from '@/typings/httpTypes/materialLibrary/createMaterial'
import type {
  MaterialLibraryDeleteMaterialRequest,
  MaterialLibraryDeleteMaterialResponse
} from '@/typings/httpTypes/materialLibrary/deleteMaterial'
import type {
  MaterialLibraryGetMaterialRequest,
  MaterialLibraryGetMaterialResponse
} from '@/typings/httpTypes/materialLibrary/getMaterial'
import type {
  MaterialLibraryGetMaterialLibraryRequest,
  MaterialLibraryGetMaterialLibraryResponse
} from '@/typings/httpTypes/materialLibrary/getMaterialLibrary'

const context = config.REQUEST_PREFIX + '/materialLibrary'

const api = {
  getMaterialLibrary: `${context}/getMaterialLibrary`,
  createMaterialLibrary: `${context}/createMaterialLibrary`,
  modifyMaterialLibrary: `${context}/modifyMaterialLibrary`,
  deleteMaterialLibrary: `${context}/deleteMaterialLibrary`,
  createMaterial: `${context}/createMaterial`,
  deleteMaterial: `${context}/deleteMaterial`,
  getMaterial: `${context}/getMaterial`
}

//获取素材库分组
export const getMaterialLibraryApi =
  (): Promise<MaterialLibraryGetMaterialLibraryResponse> => {
    return kRequest.get({
      url: api.getMaterialLibrary
    })
  }

//创建素材库分组
export const createMaterialLibraryApi = (
  params: MaterialLibraryCreateMaterialLibraryRequest
): Promise<MaterialLibraryCreateMaterialLibraryResponse> => {
  return kRequest.post({
    url: api.createMaterialLibrary,
    data: params
  })
}

//修改素材库分组
export const modifyMaterialLibraryApi = (
  params: MaterialLibraryModifyMaterialLibraryRequest
): Promise<MaterialLibraryModifyMaterialLibraryResponse> => {
  return kRequest.post({
    url: api.modifyMaterialLibrary,
    data: params
  })
}

//删除素材库分组
export const deleteMaterialLibraryApi = (
  params: MaterialLibraryDeleteMaterialLibraryRequest
): Promise<MaterialLibraryDeleteMaterialLibraryResponse> => {
  return kRequest.post({
    url: api.deleteMaterialLibrary,
    data: params
  })
}

//添加素材
export const createMaterialApi = (
  params: MaterialLibraryCreateMaterialRequest
): Promise<MaterialLibraryCreateMaterialResponse> => {
  return kRequest.post({
    url: api.createMaterial,
    data: params
  })
}

//删除素材
export const deleteMaterialApi = (
  params: MaterialLibraryDeleteMaterialRequest
): Promise<MaterialLibraryDeleteMaterialResponse> => {
  return kRequest.post({
    url: api.deleteMaterial,
    data: params
  })
}

//获取素材
export const getMaterialApi = (
  params: MaterialLibraryGetMaterialRequest
): Promise<MaterialLibraryGetMaterialResponse> => {
  return kRequest.get({
    url: api.getMaterial,
    params
  })
}
