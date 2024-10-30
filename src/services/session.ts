
import { SessionInfo } from '@/types/session';
import { request } from '@umijs/max';

/** 获取电影列表 GET /api/Sessions/list */
export async function getSessionList(
  params: {
    current?:number;
    pageSize?:number;
    filmName?:string;
  },
  options?: { [key: string]: any },
) : Promise<API.ResponsePageData<SessionInfo>> {
  return request('/api/sessions/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 新增电影 */
export async function addSession(body: SessionInfo, options?: { [key: string]: any }) {
  return request('/api/sessions/add', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

/** 删除电影 */
export async function deleteSession(id: string, options?: { [key: string]: any }) {
  return request(`/api/sessions/delete`, {
    method: 'DELETE',
    params:{
      id,
    },
    ...(options || {}),
  });
}

/** 更新电影 */
export async function updateSession(body: SessionInfo, options?: { [key: string]: any }) {
  return request('/api/sessions/update', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}