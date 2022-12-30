import kRequest from '../index'
import config from '@/config'
import type {
  DiyCreateDiyRequest,
  DiyCreateDiyResponse
} from '@/typings/httpTypes/diy/createDiy'
import type {
  DiyModifyDiyRequest,
  DiyModifyDiyResponse
} from '@/typings/httpTypes/diy/modifyDiy'
import type { DiyGetDiyResponse } from '@/typings/httpTypes/diy/getDiy'
import type {
  DiyDeleteDiyRequest,
  DiyDeleteDiyResponse
} from '@/typings/httpTypes/diy/deleteDiy'
import type {
  DiySwitchDiyRequest,
  DiySwitchDiyResponse
} from '@/typings/httpTypes/diy/switchDiy'
const context = config.REQUEST_PREFIX + '/diy'

const api = {
  createDiy: `${context}/createDiy`,
  modifyDiy: `${context}/modifyDiy`,
  getDiy: `${context}/getDiy`,
  deleteDiy: `${context}/deleteDiy`,
  switchDiy: `${context}/switchDiy`
}

export const createDiyApi = (
  params: DiyCreateDiyRequest
): Promise<DiyCreateDiyResponse> => {
  return kRequest.post({
    url: api.createDiy,
    data: params
  })
}

export const modifyDiyApi = (
  params: DiyModifyDiyRequest
): Promise<DiyModifyDiyResponse> => {
  return kRequest.post({
    url: api.modifyDiy,
    data: params
  })
}

export const getDiyDataApi = (): Promise<DiyGetDiyResponse> => {
  return kRequest.get({
    url: api.getDiy
  })
}

export const deleteDiyDataApi = (
  params: DiyDeleteDiyRequest
): Promise<DiyDeleteDiyResponse> => {
  return kRequest.post({
    url: api.deleteDiy,
    data: params
  })
}

export const switchDiyDataApi = (
  params: DiySwitchDiyRequest
): Promise<DiySwitchDiyResponse> => {
  return kRequest.post({
    url: api.switchDiy,
    data: params
  })
}
