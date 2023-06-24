import kRequest from './index'
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
  AdminGetSocialCircleDetailReq,
  AdminGetSocialCircleDetailRes,
  AdminGetSocialCirclePageReq,
  AdminGetSocialCirclePageRes,
  AdminUpdateSocialCircleClassifyReq,
  AdminUpdateSocialCircleClassifyRes,
  AdminUpdateSocialCircleGuideStatusReq,
  AdminUpdateSocialCircleGuideStatusRes,
  AdminUpdateSocialCircleReq,
  AdminUpdateSocialCircleRes,
  AdminUpdateSocialCircleStatusReq,
  AdminUpdateSocialCircleStatusRes
} from '~@/apiTypes/socialCircle'

const context = '/socialCircle'

const api = {
  createSocialCircle: `${context}/createSocialCircle`, //创建圈子
  updateSocialCircle: `${context}/updateSocialCircle`, //更新圈子
  deleteSocialCircle: `${context}/deleteSocialCircle`, //删除圈子
  updateSocialCircleStatus: `${context}/updateSocialCircleStatus`, //,更新圈子状态
  updateSocialCircleGuideStatus: `${context}/updateSocialCircleGuideStatus`, //,更新圈子首页展示状态状态
  getSocialCirclePage: `${context}/getSocialCirclePage`, //获取圈子分页列表
  getSocialCircleDetail: `${context}/getSocialCircleDetail`, //获取圈子详情
  createSocialCircleClassify: `${context}/createSocialCircleClassify`, //创建圈子分类
  updateSocialCircleClassify: `${context}/updateSocialCircleClassify`, //更新圈子分类
  deleteSocialCircleClassify: `${context}/deleteSocialCircleClassify`, //删除圈子分类
  getSocialCircleClassifyList: `${context}/getSocialCircleClassifyList` //获取圈子列表
}

export function createSocialCircleApi(
  params: AdminCreateSocialCircleReq
): Promise<AdminCreateSocialCircleRes> {
  return kRequest.post({
    url: api.createSocialCircle,
    data: params
  })
}

export function updateSocialCircleApi(
  params: AdminUpdateSocialCircleReq
): Promise<AdminUpdateSocialCircleRes> {
  return kRequest.post({
    url: api.updateSocialCircle,
    data: params
  })
}

export function deleteSocialCircleApi(
  params: AdminDeleteSocialCircleReq
): Promise<AdminDeleteSocialCircleRes> {
  return kRequest.post({
    url: api.deleteSocialCircle,
    data: params
  })
}

export function updateSocialCircleStatusApi(
  params: AdminUpdateSocialCircleStatusReq
): Promise<AdminUpdateSocialCircleStatusRes> {
  return kRequest.post({
    url: api.updateSocialCircleStatus,
    data: params
  })
}

export function updateSocialCircleGuideStatusApi(
  params: AdminUpdateSocialCircleGuideStatusReq
): Promise<AdminUpdateSocialCircleGuideStatusRes> {
  return kRequest.post({
    url: api.updateSocialCircleGuideStatus,
    data: params
  })
}

export function getSocialCirclePageApi(
  params: AdminGetSocialCirclePageReq
): Promise<AdminGetSocialCirclePageRes> {
  return kRequest.get({
    url: api.getSocialCirclePage,
    params
  })
}

export function getSocialCircleDetailApi(
  params: AdminGetSocialCircleDetailReq
): Promise<AdminGetSocialCircleDetailRes> {
  return kRequest.get({
    url: api.getSocialCircleDetail,
    params
  })
}

export function createSocialCircleClassifyApi(
  params: AdminCreateSocialCircleClassifyReq
): Promise<AdminCreateSocialCircleClassifyRes> {
  return kRequest.post({
    url: api.createSocialCircleClassify,
    data: params
  })
}

export function updateSocialCircleClassifyApi(
  params: AdminUpdateSocialCircleClassifyReq
): Promise<AdminUpdateSocialCircleClassifyRes> {
  return kRequest.post({
    url: api.updateSocialCircleClassify,
    data: params
  })
}

export function deleteSocialCircleClassifyApi(
  params: AdminDeleteSocialCircleClassifyReq
): Promise<AdminDeleteSocialCircleClassifyRes> {
  return kRequest.post({
    url: api.deleteSocialCircleClassify,
    data: params
  })
}

export function getSocialCircleClassifyListApi(): Promise<AdminGetSocialCircleClassifyListRes> {
  return kRequest.get({
    url: api.getSocialCircleClassifyList
  })
}
