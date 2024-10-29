import { HallInfo } from '@/types/hall';
import { request } from '@umijs/max';

/** 更新影厅 */
export async function updateHall(body: HallInfo, options?: { [key: string]: any }) {
    return request('/api/hall/modifyHall', {
      method: 'PUT',
      data: {
        ...body,
      },
      ...(options || {}),
    });
  }

  /** 获取影厅列表 GET /api/hall/list */
export async function getHallList(
  params: {
    current?:number;
    pageSize?:number;
    hallName?:string;
    hallDesc?:string;
  },
  options?: { [key: string]: any },
) : Promise<API.ResponsePageData<HallInfo>> {
  return request('/api/hall/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
/** 删除影厅 */
export async function deleteHall(id: string, options?: { [key: string]: any }) {
  return request(`/api/hall/delete`, {
    method: 'DELETE',
    params: {
      id,
    },
    ...(options || {}),
  });
}

/** 新增影厅 */
export async function addHall(body: HallInfo, options?: { [key: string]: any }) {
  return request('/api/hall/createHall', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}


export async function getHallNameList(options?: { [key: string]: any }) {
  return request('/api/hall/getHallForName', {
    method: 'GET',
    ...(options || {}),
  });
}
