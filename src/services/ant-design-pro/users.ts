
import { request } from '@umijs/max';

/** 获取用户列表 GET /api/users/list */
export async function getUsersList(
  params: {
    current?:number;
    pageSize?:number;
    name?:string;
    nickname?:string;
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/api/users/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
