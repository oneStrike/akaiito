import kRequest from '../index'
import config from '@/config'
import type {
  AdminCreateDiyPageReq,
  AdminCreateDiyPageRes,
  AdminDeleteDiyPageReq,
  AdminDeleteDiyPageRes,
  AdminGetDiyPageRes,
  AdminSwitchPageStatusReq,
  AdminSwitchPageStatusRes,
  AdminUpdateDiyPageReq,
  AdminUpdateDiyPageRes
} from '~@/apiTypes/diyClientPage'
const context = config.REQUEST_PREFIX + '/diyClientPage'

const api = {
  createDiyPage: `${context}/createDiyPage`,
  updateDiyPage: `${context}/updateDiyPage`,
  getDiyPage: `${context}/getDiyPage`,
  deleteDiyPage: `${context}/deleteDiyPage`,
  switchPageStatus: `${context}/switchPageStatus`
}

export const createDiyApi = (
  params: AdminCreateDiyPageReq
): Promise<AdminCreateDiyPageRes> => {
  return kRequest.post({
    url: api.createDiyPage,
    data: params
  })
}

export const modifyDiyApi = (
  params: AdminUpdateDiyPageReq
): Promise<AdminUpdateDiyPageRes> => {
  return kRequest.post({
    url: api.updateDiyPage,
    data: params
  })
}

export const getDiyDataApi = (): Promise<AdminGetDiyPageRes> => {
  return kRequest.get({
    url: api.getDiyPage
  })
}

export const deleteDiyDataApi = (
  params: AdminDeleteDiyPageReq
): Promise<AdminDeleteDiyPageRes> => {
  return kRequest.post({
    url: api.deleteDiyPage,
    data: params
  })
}

export const switchDiyDataApi = (
  params: AdminSwitchPageStatusReq
): Promise<AdminSwitchPageStatusRes> => {
  return kRequest.post({
    url: api.switchPageStatus,
    data: params
  })
}
