
import { UserInfo } from '@/types/user';
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
): Promise<API.ResponsePageData<UserInfo>> {
  return request('/api/users/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}


/** 新增用户 */
export async function addUser(body: UserInfo, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request('/api/users/add', {
    method: 'POST',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}

/** 删除用户 */
export async function deleteUser(id: string, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request(`/api/users/delete/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 更新用户 */
export async function updateUser(body: UserInfo, options?: { [key: string]: any }): Promise<API.ResponseData> {
  return request('/api/users/update', {
    method: 'PUT',
    data: {
      ...body,
    },
    ...(options || {}),
  });
}
